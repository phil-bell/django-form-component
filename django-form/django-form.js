import { LitElement, html } from "lit";
import { customElement, property, query, queryAll } from "lit/decorators.js";
import Cookies from "js-cookie";

@customElement("django-form")
export class DjangoForm extends LitElement {
  /* Queries */
  @query('[part="django-form__error--generic"]')
  fallbackError;

  @queryAll("input, textarea, select")
  inputs;

  @queryAll('.django-form__error--field, [part="django-form__error--generic"]')
  errors;

  /* Properties */
  @property({ type: String })
  method = "post";

  @property({ type: String })
  action = "";

  @property({ type: String })
  button = "Add";

  @property({ type: String, attribute: "success-message" })
  successMessage = "saved";

  @property({ type: Boolean })
  success = false;

  @property({ type: Object })
  headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": Cookies.get("csrftoken"),
  };

  @property({ type: Object, attribute: false})
  form = JSON.stringify(
    [...this.inputs].forEach((input) => (form[input.name] = input.value))
  );

  /* Events */
  @eventOptions({ passive: true })
  handleSubmit() {
    this.sendForm();
  }

  /* Internal methods */
  _fetch() {
    return fetch(this.action, {
      method: this.method,
      headers: this.headers,
      body: this.form,
    });
  }

  /* Methods */
  clearErrors() {
    this.errors && this.errors.forEach((element) => element.remove());
  }

  renderErrors(errors) {
    Object.entries(errors).map(([field, error]) => {
      const input = document.querySelector(`#id_${field}`);
      if (input) {
        input.after(this.fieldErrorTemplate(error));
        return;
      }
      this.genericErrors = this.genericErrorTemplate(error);
    });
  }

  /* Async methods */
  async handleError(res) {
    const errors = await res.json();
    this.renderErrors(errors);
  }

  async sendForm() {
    this.clearErrors();
    try {
      const res = await this._fetch();
      if (!res.ok) {
        throw new Error(res.error);
      }
      this.success = true;
    } catch {
      this.handleError(res);
    }
    return res;
  }

  /* Templates */
  fieldErrorTemplate(message) {
    return html`<p class="django-form__error--field">${message}</p>`;
  }

  genericErrorTemplate(message) {
    html`
      ${this.genericErrors}
      <p part="django-form__error--generic">${message}</p>
    `;
  }

  buttonTemplate() {
    return html`
      <button part="django-form__button--submit" type="submit">
        ${this.button}
      </button>
    `;
  }

  messageTemplate() {
    return html`<p
      ?hidden="${!this.success}"
      part="django-form__message--success"
    >
      ${this.successMessage}
    </p>`;
  }

  errorTemplate() {
    return html`
      ${this.genericErrors}
    `;
  }

  formTemplate() {
    return html`
      <form part="django-form" @submit=${this.handleSubmit}>
        <slot></slot>
        ${this.buttonTemplate()} ${this.messageTemplate()}
        ${this.errorTemplate()}
      </form>
    `;
  }

  /* render */
  render() {
    return html` ${this.renderForm()} `;
  }
}
