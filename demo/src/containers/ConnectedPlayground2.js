import Playground from "../components/Playground2";
import { connectGetter } from "vuex-in-react";

const mapGetterToProps = (getter, ownProps) => ({
  isGreaterThan2: getter.countGreaterThan2
});

const PlaygroundContainer = connectGetter(mapGetterToProps)(Playground);

export default PlaygroundContainer;
