import * as actions from '../../store/actions/index';

export const mapDispatchToProps = dispatch => {
  return {
    onUpdateToolbar: (config) => dispatch(actions.updateToolbar(config)),
    onCatchPokemon: (pokemon) => dispatch(actions.addMyPokemon(pokemon)),
    onGetPokemonDetail: (url, id) => dispatch(actions.getPokemonDetail(url, id)),
    onUpdateModal: (modal) => dispatch(actions.updateModal(modal))
  };
};