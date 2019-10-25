export default function Store(initialState = {}) {
    this.state = initialState;
}
Store.prototype.mergeState = function(partialState) {
    Object.assign(this.state, partialState);
};
  