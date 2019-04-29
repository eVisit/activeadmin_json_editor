#-*- encoding: utf-8; tab-width: 2 -*-

class JsonInput < Formtastic::Inputs::TextInput
  # def to_html
  #   html = '<div class="jsoneditor-wrap">'
  #   current_value = @object.public_send method
  #   html << builder.text_area(method, input_html_options.merge(
  #                                       value: (current_value.respond_to?(:to_json) ? current_value.to_json : ''), 'data-modes': options[:modes].to_json ))
  #   html << '</div>'
  #   html << '<div style="clear: both"></div>'
  #   input_wrapping do
  #     label_html << html.html_safe
  #   end
  # end

  def to_html
    html = '<div class="jsoneditor-wrap">'
    value = @object.public_send method
    value = options[:value] if options[:value]
    
    if value.respond_to?(:to_json)
      value_as_json = value.to_json
    else
      value
    end

    html << builder.text_area(method, input_html_options.merge(
                                        value: value_as_json, 'data-options': options[:editor_options].to_json ))
    html << '</div>'
    html << '<div style="clear: both"></div>'
    input_wrapping do
      label_html << html.html_safe
    end
  end

end
