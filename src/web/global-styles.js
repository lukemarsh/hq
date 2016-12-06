import { injectGlobal } from 'styled-components';
import 'sanitize.css/sanitize.css';
import 'web/styles/fonts.css';
import 'web/styles/icons.css';
import 'web/styles/typography.css';
import 'web/styles/forms.css';
import 'web/styles/buttons.css';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  body {
    font-family: 'apercu', Helvetica, Arial, sans-serif;
  }
`;
