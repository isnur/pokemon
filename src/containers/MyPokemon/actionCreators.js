import * as actions from '../../store/actions/index';

export const mapDispatchToProps = dispatch => {
  return {
    onUpdateToolbar: (config) => dispatch(actions.updateToolbar(config)),
    onRemove: (id) => dispatch(actions.deleteMyPokemon(id)),
  };
};