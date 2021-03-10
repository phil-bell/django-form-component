# django-form-component

`django-form-component` is a Web Component wrapper for [Django Forms](https://docs.djangoproject.com/en/3.1/topics/forms/#the-template) using in templates.

### Install

```
npm install django-form-component
```

### Usage

`index.js`

```js
import "django-form-component"
```

`index.html`

```html
<django-form action="api/send/" method="post" button="send">
  {{ send_form.as_p }}
</django-form>
```

### Attributes

`action` - the url/api you are sending the form to

`method` - the request type you'd like, eg `post` `get` `put`. Default - `post`

`button` - the text that will be on the submit button. Default - `Add`

You then place you Django form in the slot like seen above and it will be used by the components.
