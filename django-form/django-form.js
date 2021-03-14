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
    };
  }

  constructor() {
    super();
    this.button = "Add";
    this.method = "post";
  }

  async handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    await fetch(this.action, {
      method: this.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: form,
    });
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <slot></slot>
        <button type="submit">${this.button}</button>
      </form>
    `;
  }
}

customElements.define("django-form", DjangoForm);
