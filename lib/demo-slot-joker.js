'use babel';

import DemoSlotJokerView from './demo-slot-joker-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotJokerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotJokerView = new DemoSlotJokerView(state.demoSlotJokerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotJokerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-joker:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotJokerView.destroy();
  },

  serialize() {
    return {
      demoSlotJokerViewState: this.demoSlotJokerView.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotJoker was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
