import React from "react";
import { Container } from 'semantic-ui-react'
import PetsList from "./PetsList";
import MenuLogic from "./MenuLogic";

class App extends React.Component {
    state = { status: "available" };

    onMenuChange = async (status) => {
        this.setState({ status: status });
    };

    render() {
        return (
            <div className="App" >
                <Container>
                    <MenuLogic onMenuChange={this.onMenuChange} />
                    <PetsList status={this.state.status} />
                </Container >
            </div>
        );
    }
}

export default App;