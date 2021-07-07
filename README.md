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

### `headers`

default = `{
    "Content-Type": "application/json",
    "X-CSRFToken": Cookies.get("csrftoken"),
  }`

headers used in the fetch request

## `Extending`

### `Styling`

The built in relevant style tags are as follow:

- `.django-form__error--field`
- `django-form::part(django-form)`
- `django-form::part(django-form__button--submit)`
- `django-form::part(django-form__message--success)`
- `django-form::part(django-form__error--generic)`

**Note** that elements that are in the slot use classes but elements in the shadowDom have `::part` attributes.

If want to extend and add styling to the form, you can use `lit` to add styles like so:

```js
import { customElement } from "lit/decorators.js";
import { css } from "lit";
import { DjangoForm } from "django-form-component";

@customElement("review-form")
export class ReviewForm extends DjangoForm {
  static styles = css`
      slotted(p) {
        color: red;
      }
      form {
        display: flex;
      }
    `;
  }
}
```

This component also supports `::part`, so you can do something like this in your `.css` file:

```css
/* styling the slot */
.django-form__error--field {
  color: red;
}

/* styling the shadowDom */
django-form::part(django-form__button--submit) {
  background-color: aquamarine;
}
```

### `Response handling`

Say your backend sends back some `data` on success and you want to do something with that. You can override the `sendForm` method to get the response of which you can do with what you want

```js
import { customElement } from "lit/decorators.js";
import { DjangoForm } from "django-form-component";

@customElement("review-form")
export class ReviewForm extends DjangoForm {
  async sendForm() {
    const res = await super.sendForm();
    alert(`Backend says: ${res.data}`);
  }
}
```
