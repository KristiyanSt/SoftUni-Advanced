import { html, render } from './../node_modules/lit-html/lit-html.js';
import { ifDefined } from './../node_modules/lit-html/directives/if-defined.js'

let tableBodyTemplate = (data) => html`${data.map(tableRowTemplate)}`

let tableRowTemplate = (user) => {
   return html`<tr class=${ifDefined(user.class)}>
      <td>${user.firstName} ${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.course}</td>
   </tr>`
}

export {
   render,
   tableBodyTemplate
}