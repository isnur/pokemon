export const mapStateToProps = state => {
  return {
    myPokemon: state.myPokemon.myPokemonList,
    modal: state.modal,
    loading: state.myPokemon.loading,
    errorMsg: state.myPokemon.errorMsg,
    pokemonDetail: state.myPokemon.pokemonDetail,
    selectedPokemon: state.myPokemon.selectedPokemon
  };
};