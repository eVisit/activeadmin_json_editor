//= require jsoneditor/jsoneditor.js
//= require jsoneditor/asset/jsonlint/jsonlint.js

;(function(window, $) {
  $(function() {
    $('div.jsoneditor-wrap').each(function(i,wrap){

      var fieldset = $(wrap).parents('li:eq(0)');
      var container = $(wrap)[0];
      var textarea = $($(wrap).find('textarea'));
      var modes = ['tree', 'text'];

      if ( $(textarea).attr('data-options') ) {
        var optionsOverride = JSON.parse($(textarea).attr('data-options'));
      }
      else {
        var optionsOverride = {};
      }

      var editor;
      var options = {
        modes: modes,

        change: function(ev){
          try {
            var text = JSON.stringify(editor.get());
            textarea.text(text);
            $(fieldset).toggleClass('error',false);
            textarea.text(JSON.stringify(editor.get()));
          } catch (e) {
            editor.options.error(e);
          }
        },
        error: function(e){
          $(fieldset).toggleClass('error',true);
        }
      };

      Object.assign(options, optionsOverride);
      options['mode'] = options['modes'][0];

      editor = new JSONEditorLegacy(container, options,JSON.parse(textarea.val()));
    });
  });
})(window, jQuery);
