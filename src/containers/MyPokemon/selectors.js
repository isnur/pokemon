export const mapStateToProps = state => {
  return {
    toolbar: state.toolbar,
    myPokemon: state.myPokemon.myPokemonList
  };
};