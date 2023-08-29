class TimeFormatted extends HTMLElement {

  render() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  static get observedAttributes() {
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);

class LiveTimer extends HTMLElement {
	render() {
		this.innerHTML = `
		<time-formatted hour="numeric" minute="numeric" second="numeric"></time-formatted>`;

		this.timerElem = this.firstElementChild;
	}

	connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
		this.timer = setInterval(() => {
			this.update()
		}, 1000);
  }

	update() {
		this.date = new Date();
		this.timerElem.setAttribute('datetime', this.date);
		this.dispatchEvent(new CustomEvent('tick', { detail: this.date }));
	}

	disconnectedCallback() {
		clearInterval(this.timer);
	}
}

customElements.define("live-timer", LiveTimer);