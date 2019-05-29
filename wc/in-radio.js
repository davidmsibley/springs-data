import { AppComponent } from '@sibley/app-component';
import { genId } from './gen-id.js';
import tpl from './in-radio.html';

export class InRadio extends AppComponent {
  constructor() {
    super();
    AppComponent.init(this, InRadio, tpl);

    this.observedAttributes['choices'].push(this.renderChoices.bind(this));
    this.observedAttributes['choice'].push((function(prop, val) {
      this.setAttribute(prop, this.serializeAttribute(val));
      const option = this.shadowRoot.querySelector('[value='+this.data.choice+']');
      if (option) {
        option.checked = true;
      }
    }).bind(this));

    this.on('attributechange', (function(){
      this.dispatchEvent(
        new CustomEvent('attributechange', {
          bubbles: true,
          cancelable: true
        })
      );
    }).bind(this));
  }

  get eventListeners() {
    const thing = (function(event) {
      const selected = this.shadowRoot.querySelector(':checked');
      this.data.choice = selected.getAttribute('value');
    }).bind(this);
    return [['click', 'input', thing]];
  }

  renderChoices() {
    const container = this.shadowRoot,
      template = this.$choiceTpl,
      name = this.data['in-name'],
      choices = this.data.choices;

    if (!container || !template || !name || !choices) {
      return;
    }

    container.querySelectorAll('.choice').forEach((el) => {el.remove()})

    let checked = false;
    for (let choice of choices) {
      let tplb = AppComponent.stashe(template.content.cloneNode(true));
      let context = {};
      context.id = genId();
      context.name = name;
      context.choice = choice;
      let result = tplb(context);
      let $input = result.querySelector('input');
      if (!checked) {
        $input.checked = true;
        checked = true;
        this.data.choice = choice;
      }
      container.appendChild(result);
    }
  }

  static get observedAttributes() {
    return ['in-name', 'choices', 'choice'];
  }
}

window.customElements.define('in-radio', InRadio);
