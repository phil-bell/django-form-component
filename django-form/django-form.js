import { LitElement, html } from "lit-element";
import Cookies from "js-cookie";

export class DjangoForm extends LitElement {
  static get properties() {
    return {
      method: {
        type: String,
        attribute: "method",
      },
      action: {
        type: String,
        attribute: "action",
      },
      button: {
        type: String,
        attribute: "button",
      },
      successMessage: {
        type: String,
        attribute: "success-message",
      },
      success: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.button = "Add";
    this.method = "post";
    this.successMessage = "saved";
    this.success = false;
  }

  get form() {
    this.inputs = this.querySelectorAll("input, textarea, select");
    let form = new Object();
    [...this.inputs].forEach((input) => (form[input.name] = input.value));
    return JSON.stringify(form);
  }

  errorMessage(message) {
    const error = document.createElement("p");
    error.innerText = message;
    error.classList.add("django-form__field-error");
    return error;
  }

  clearErrors() {
    const errors = document.querySelectorAll(
      '.django-form__field-error, [part="django-form__fallback-error"]'
    );
    if (errors) {
      errors.forEach((element) => element.remove());
    }
  }

  async renderErrors(errors) {
    Object.entries(errors).map(([field, error]) => {
      let input = document.querySelector(`#id_${field}`);
      if (input) {
        input.after(this.errorMessage(error));
        return;
      }
      this.shadowRoot
        .querySelector('[part="django-form__fallback-error"]')
        .appendChild(this.errorMessage(error));
    });
  }

  async sendForm() {
    this.clearErrors();
    let res = await fetch(this.action, {
      method: this.method,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: this.form,
    }).then(async (response) => {
      if (response.status !== 200) {
        const res_errors = await response.json();
        this.renderErrors(res_errors);
        return;
      }
      this.success = true;
    });
    return res;
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.sendForm();
  }

  render() {
    return html`
      <form part="django-form" @submit=${this.handleSubmit}>
        <slot></slot>
        <button part="django-form__submit-button" type="submit">
          ${this.button}
        </button>
        <p ?hidden="${!this.success}" part="django-form__success-message">
          ${this.successMessage}
        </p>
        <div part="django-form__fallback-error"></div>
      </form>
    `;
  }
}

customElements.define("django-form", DjangoForm);
