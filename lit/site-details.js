import { LitElement, html, css } from 'lit-element';
export { SitePhotos } from './site-photos.js';
export { SiteBedMaterials } from './site-bed-materials.js';
import { genId } from './gen-id.js';

export class SiteDetails extends LitElement {
  static get properties() {
    return {
      siteinfo: {
        type: Object
      },
      photos: {
        type: Array
      },
      aggrData: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    this.genId = (function() {
      const memo = {};
      return function(index) {
        if (!memo[index]) {
          memo[index] = genId();
        }
        return memo[index];
      }
    })();
  }

  static get styles() {
    return css`
      [data-element="table"] {
        display: grid;
        grid-template-columns: 30% 70%;
        grid-gap: 0.5em;
      }

      td {
        padding: 0.5em;
      }

      .label {
        background-color: var(--palette-dark);
        font-weight: var(--font-weight-bold);
      }

      .detail {
        background-color: var(--palette-light);
      }

      .header {
        position: -webkit-sticky;
        position: sticky;
        top: 0px;
        background-color: var(--palette-white);
        padding: 1em;
        z-index: 10;
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <style>
        @import url("./css/typography.css");
      </style>

      ${(!this.siteinfo)? '' : html`
        <h1 class="header">${this.siteinfo.County} County Spring #${this.siteinfo.SpringID}</h1>
        <site-photos .photos="${this.photos}"></site-photos>
        <slot name="sketch"></slot>
        <site-bed-materials .siteinfo="${this.siteinfo}"></site-bed-materials> 
        <div data-element="table">
          ${Object.entries(this.siteinfo).map((el, index) => html`
            <td class="label">
              <label for="${this.genId(index)}">${el[0]}</label>
            </td>
            <td class="detail">
              <span id="${this.genId(index)}">${el[1]}</span>
            </td>
          `)}
        </div>
      `}
    `;
  }
}
customElements.define('site-details', SiteDetails);