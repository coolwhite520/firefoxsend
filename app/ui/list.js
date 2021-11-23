const html = require('choo/html');
const { list } = require('../utils');
const archiveTile = require('./archiveTileExt');
const modal = require('./modal');
const intro = require('./intro');

module.exports = function(state, emit) {
  if (state.user.loginRequired && !state.user.loggedIn) {
    emit('signup-cta', 'required');
  }
  const archives = state.file_list.map(archive =>
    archiveTile(state, emit, archive)
  );
  archives.reverse();
  // console.log(archives);
  const right =
    archives.length === 0
      ? intro(state)
      : list(archives, 'p-2 h-full overflow-y-auto w-full', 'mb-4 w-full');

  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <section
        class="h-full w-full p-6 md:p-8 overflow-hidden md:flex md:flex-row md:rounded-xl md:shadow-big"
      >
        <div class="w-full">${right}</div>
      </section>
    </main>
  `;
};
