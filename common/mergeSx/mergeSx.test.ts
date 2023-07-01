import { Styles } from '../../theme/theme';

import { mergeSx } from './mergeSx';

describe('mergeSx', () => {
  it('merges to style objects', () => {
    const styleObject1: Styles = { display: 'flex' };
    const styleObject2: Styles = { paddingX: '2' };

    expect(mergeSx(styleObject1, styleObject2)).toEqual({
      display: 'flex',
      paddingX: '2'
    });
  });

  it('merges 4 styles object and overrides properties', () => {
    const styleObject1: Styles = { display: 'flex' };
    const styleObject2: Styles = { paddingX: '2' };
    const styleObject3: Styles = { position: 'absolute' };
    const styleObject4: Styles = { paddingX: '5' };

    expect(
      mergeSx(styleObject1, styleObject2, styleObject3, styleObject4)
    ).toEqual({
      display: 'flex',
      paddingX: '5',
      position: 'absolute'
    });
  });
});
