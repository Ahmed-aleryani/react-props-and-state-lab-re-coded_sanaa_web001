import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
import fetchMock from '../fetch-setup'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    };
  }

  fetchPets = () => {
    let endpoint = '/api/pets';

    if (this.state.filters.type !== 'all') {
      endpoint += `?type=${this.state.filters.type}`;
    }

    fetch(endpoint)
      .then(res => res.json())
      .then(pets => this.setState({ pets: pets }));
  };

  onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  };

  onAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App
// <App />
//     Filters
//       ✓ should change filter type
//     Fetching pets
//       1) should fetch all pets by default
//       2) should fetch pet types using the type parameter based on the filter
//     Adopting pets
//       3) should set a pet's adopted status to true
