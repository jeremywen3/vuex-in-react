import Playground from "../components/Playground";
import mutations from "../mutations";
import actions from "../actions";
import { connect } from "vuex-in-react";

const mapStateToProps = (state, ownProps) => ({
  myCount: state.count
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onIncrementAsync: val => dispatch(actions.incrementAsync(val))
});
const mapCommitToProps = (commit, ownProps) => ({
  onIncrement: () => commit(mutations.increment()),
  onDecrement: () => commit(mutations.decrement())
});
const mapGetterToProps = (getter, ownProps) => ({
  isGreaterThan2: getter.countGreaterThan2
});

const PlaygroundContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mapCommitToProps,
  mapGetterToProps
)(Playground);

export default PlaygroundContainer;
