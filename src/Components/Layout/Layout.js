import React from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
// import LoadingModal from "../Loading Modal/LoadingModal";
const layout = (props) => {
  return (
    <Aux>
      {/* <LoadingModal /> */}
      <div>
        <Navigation />
      </div>
      <main>{props.children}</main>
      <Footer />
    </Aux>
  );
};

export default layout;
