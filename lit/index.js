(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lit-element')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lit-element'], factory) :
  (global = global || self, factory(global.index = {}, global.common));
}(this, function (exports, litElement) { 'use strict';

  // https://gist.github.com/gordonbrander/2230317
  const genId = function() {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  class InRadio extends litElement.LitElement {
    static get properties() {
      return {
        inName: {
          type: String,
          attribute: 'in-name'
        },
        choices: {
          type: Array
        },
        choice: {
          type: String,
          reflect: true
        }
      };
    }

    constructor() {
      super();
      this.checked = [];
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

    firstUpdated() {
      if (!this.choice && this.choices) {
        this.choice = this.choices[0];
      }
    }

    inChange(e) {
      this.choice = e.target.value;

      let event = new CustomEvent('choice-change', {
        detail: {
          choice: this.choice
        }
      });
      this.dispatchEvent(event);
    }

    render() {
      return litElement.html`
      ${this.choices.map((item, index) => litElement.html`
        <div class="choice">
          <input 
            type="radio" 
            name="${this.inName}" 
            id="${this.genId(index)}" 
            value="${item}" 
            .checked="${(this.choice === item)}" 
            @change="${this.inChange}"
          >
          <label for="${this.genId(index)}">${item}</label>
        </div>
      `)}
    `;
    }
  }
  customElements.define('in-radio', InRadio);

  function renderTime() {
    return new Date();
  }

  class AppSidebar extends litElement.LitElement {
    static get properties() {
      return {
        title: {
          type: String
        },
        trackTime: {
          type: Date,
          attribute: false
        }
      };
    }

    constructor() {
      super();
      this.renderTime = renderTime();
      
      let track = (function() {
        this.trackTime = renderTime();
      }).bind(this);
      setInterval(track, 1000);
    }

    static get styles() {
      return litElement.css`
      :host {
        padding: 0 1.5em 1.5em 1.5em;
      }

      .header {
        position: -webkit-sticky;
        position: sticky;
        top: 0px;
        background-color: var(--palette-white);
        padding: 1em;
      }

      [data-element=views] {
        display: grid;
        grid-template-columns: 33% 33% 33%;
      }
    `;
    }

    switchTab(choice) {
      if (choice !== this.$views.choice) {
        this.$views.choice = choice;
      }
      this.shadowRoot.querySelectorAll('slot').forEach((el) => {
        if ((choice === 'default' && !el.getAttribute('name')) || (el.getAttribute('name') === choice)) {
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      });
    }

    handleChoiceChange(e) {
      this.switchTab(e.detail.choice);
    }

    render() {
      return litElement.html`
      <style>
        @import url("./css/typography.css");
      </style>

      <h1 class="header">${this.title}</h1>
      <div>The current time is <span>${this.trackTime}</span></div>
      <in-radio
        data-element="views"
        in-name="view"
        choices='["default","filter","details"]'
        @choice-change="${this.handleChoiceChange}"
      ></in-radio>
      <slot></slot>
      <slot name="filter" hidden></slot>
      <slot name="details" hidden></slot>
      <div>Last refresh: ${this.renderTime}</div>
    `;
    }

    firstUpdated() {
      Object.assign(this, gatherElements(this.renderRoot, 'data-element'));
    }
  }

  function gatherElements(doc, attributeName) {
    let result = {};
    let elements = doc.querySelectorAll('[' + attributeName + ']');
    for (let el of elements) {
      let name = '$' + el.getAttribute(attributeName);
      result[name] = el;
    }
    return result;
  }
  customElements.define('app-sidebar', AppSidebar);

  class SiteDetails extends litElement.LitElement {
    static get properties() {
      return {
        siteinfo: {
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
      return litElement.css`
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
    `;
    }

    render() {
      return litElement.html`
      <style>
        @import url("./css/typography.css");
      </style>

      ${(!this.siteinfo)? '' : litElement.html`
        <h1>${this.siteinfo.County} County Spring #${this.siteinfo.SpringID}</h1>
        <div data-element="table">
          ${Object.entries(this.siteinfo).map((el, index) => litElement.html`
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

  exports.AppSidebar = AppSidebar;
  exports.SiteDetails = SiteDetails;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
