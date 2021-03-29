# `django-form-component`

`django-form` is a Web Component wrapper for [Django Forms](https://docs.djangoproject.com/en/3.1/topics/forms/#the-template)

`django-form` uses js fetch to submit the forms to your api endpoint of choice instead of the traditional django forms functionality of submitting the entire page.

This allows you have the benefits of modern responsive web pages but keep the dependency and security of Django forms.

## `Install`

```
npm install django-form-component
```

## `Usage`

`index.js`

```js
import "django-form-component";
```

`index.html`

```html
<django-form
  action="api/send/"
  method="post"
  button="send"
  success-message="success"
>
  {{ send_form.as_p }}
</django-form>
```

## `Attributes`

### `action`

the url/api you are sending the form to

### `method`

default - `post`

the request type you'd such as `post` `get` `put`

### `button`

default - `Add`

the text that will be on the submit button

### `success-message`

default - `Saved`

the text shown on successful form submission

## `Extending`

### `Styling`

The built in relevant style tags are as follow:

- `.django-form__field-error`
- `django-form::part(django-form)`
- `django-form::part(django-form__submit-button)`
- `django-form::part(django-form__success-message)`
- `django-form::part(django-form__fallback-errors)`

**Note** that elements that are in the slot use classes and ones in the shadowDom have `::part` attributes.

If want to extend and add styling to the form, you can use `lit-element` to add a styles method.

```js
import { css } from "lit-element";
import { DjangoForm } from "django-form-component";

export class ReviewForm extends DjangoForm {
  static get styles() {
    return css`
      slotted(p) {
        color: red;
      }
      form {
        display: flex;
      }
    `;
  }
}

customElements.define("review-form", ReviewForm);
```

This component also supports `::part`, so you can do something like this in your `.css` file:

```css
.django-form__field-error {
  color: red;
}

django-form::part(django-form__submit-button) {
  background-color: aquamarine;
}
```

### `Response handling`

Say your backend sends back some `data` on success and you want to do something with that. You can override the `sendForm` method to get the response of which you can do with what you want

```js
import { DjangoForm } from "django-form-component";

export class ReviewForm extends DjangoForm {
  sendForm() {
    let res = super.sendForm();
    alert(`Backend says: ${res.data}`);
  }
}

customElements.define("review-form", ReviewForm);
```
