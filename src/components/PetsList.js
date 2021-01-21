import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPets } from '../actions';
import {
    Grid,
    Segment,
    Container,
    Header,
    Pagination,
    PaginationProps,
    Icon
} from 'semantic-ui-react';


class PetsList extends Component {
    componentDidMount() {
        this.props.fetchPets("available");
    }
    renderList() {
        return this.props.pets.map((pet, index) => {
            return (
                <div className="item" key={index}>
                    <div className="right floated content">
                        <div className="ui button">Add</div>
                    </div>
                    <div className="content">
                        {pet.name}
                    </div>
                </div>

            )
        });
    }
    render() {
        return <div className="ui relaxed divided list">{this.renderList()}</div>;
    }

    render() {
        return (
            <Container style={{ marginTop: '3em' }} text>
                <Grid columns={1} divided="vertically">
                    <Grid.Row>
                        {(this.state.articleDatas || []).map(function (articleData, i) {
                            return (
                                <Grid.Column>
                                    <Segment>
                                        <Header as="h1">{articleData.title}</Header>
                                        <p>{articleData.content}</p>
                                        <Link to={`/detail/${articleData.id}`}>
                                            continue reading
                        </Link>
                                    </Segment>
                                </Grid.Column>
                            );
                        })}
                    </Grid.Row>
                </Grid>
                <Pagination
                    defaultActivePage={1}
                    totalPages={Math.ceil(this.state.articles.length / 5)}
                    onPageChange={this.btnClick}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return { pets: state.pets };
};

export default connect(
    mapStateToProps,
    { fetchPets }
)(PetsList);