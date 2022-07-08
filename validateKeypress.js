// Validates user keystroke input against a chosen regular expression
// Author: Matt Kerr <matthew.kerr@noaa.gov>
///////////////////////////////////////////////////
// Parameters:
// int
// 	regex_arg_1 = length
//  regex_arg_2 = leading 0 allowed (bool)
// int_or_zero
//  regex_arg_1 = length
// int_or_double_zero
//  regex_arg_1 = length
// dec
//  regex_arg_1 = length
//  regex_arg_2 = precision
//  regex_arg_3 = leading 0 allowed (bool)
// comment
//  regex_arg_1 = length
function validateKeypress(event, page_item, regex_type, regex_arg_1, regex_arg_2, regex_arg_3)
{
	var input = document.getElementById(page_item);
	var input_str = apex.item(page_item).getValue();	
	var key_code = (event.which) ? event.which : event.keyCode
	// convert key code if entered from numpad
	if (key_code >= 96 && key_code <= 105)
	{
		key_code -= 48;
	}
	var key = String.fromCharCode(key_code);
	var caret = input.selectionStart;
	var selection_start_pos = input.selectionStart;
	var selection_end_pos = input.selectionEnd;
	var selection_length = selection_end_pos - selection_start_pos;
	var pre_selection_text = input_str.substring(0, selection_start_pos);
	var post_selection_text = input_str.substring(selection_end_pos, input_str.length);
	var constructed_str;
	var r;
	
	// Initial sanity checks
	if (event.shiftKey
		&& key_code >= 48
		&& key_code <= 57
		&& (["int","int_or_zero","int_or_double_zero","any_int","dec"
			,"month","day","year","hour","minute_second"
			,"time","min_sec","pct_error","pct_int"].includes(regex_type))) { return false; }
	
	// User should not be able to create newlines except in messages.
	if (event.key === "Enter") { return false; }
	
	// 192 = ` and ~
	// Special characters reserved exclusively for Atlas transmit files
	if (key_code == 192) { return false; }
	
	// Non-printing keypresses that should always be accepted
	// 9 = tab
	// 27 = escape key
	// 37 to 40 = arrow keys
	// 65 = a (user presses ctrl-a to select all)
	// 116 = f5
	if (key_code == 9
		|| key_code == 27
		|| (key_code >= 37 && key_code <= 40)
		|| (key_code == 65 && event.ctrlKey)
		|| key_code == 116) { return true; }
	
	if (regex_type == "int")
	{
		if (regex_arg_2) { r = new RegExp("^(?!^[0]{2}.*$)[0-9]{0," + regex_arg_1 + "}$"); }
		else { r = new RegExp("^(?!^[0]{1}.*$)[0-9]{0," + regex_arg_1 + "}$"); }
	}
	else if (regex_type == "int_or_zero") { r = new RegExp("^$|^0$|^(?!^[0]{1}.*$)[0-9]{0," + regex_arg_1 + "}$"); }
	else if (regex_type == "int_or_double_zero") { r = new RegExp("^$|^0$|^00$|^(?!^[0]{1}.*$)[0-9]{0," + regex_arg_1 + "}$"); }
	else if (regex_type == "any_int") { r = new RegExp("^[0-9]{0," + regex_arg_1 + "}$"); }
	else if (regex_type == "dec")
	{
		if (regex_arg_3) { r = new RegExp("^(?!^[0]{2}.*$)(?:[0-9]{0," + (regex_arg_1 - regex_arg_2) + "}|$)(?:\\.|$)(?:[0-9]{0," + regex_arg_2 + "}|$)$"); }
		else { r = new RegExp("^(?!^[0]{1}.*$)(?:[0-9]{0," + (regex_arg_1 - regex_arg_2) + "}|$)(?:\\.|$)(?:[0-9]{0," + regex_arg_2 + "}|$)$"); }
	}
	else if (regex_type == "month") { r = new RegExp("^([0-1]|0[1-9]|1[0-2]|$)$"); }
	else if (regex_type == "day") { r = new RegExp("^([0-3]|0[1-9]|[1-2][0-9]|3[0-1]|$)$"); }
	else if (regex_type == "year") { r = new RegExp("^(2|20|20[0-9]{0,2}|$)$"); }
	else if (regex_type == "hour") { r = new RegExp("^([0-2]|[0-1][0-9]|2[0-3]|$)$"); }
	else if (regex_type == "minute_second") { r = new RegExp("^([0-5]|[0-5][0-9]|$)$"); }
	else if (regex_type == "char") { r = new RegExp("^[a-zA-Z]*$"); }
	else if (regex_type == "time") { r = new RegExp("^[0-9]{0,4}$"); }
	else if (regex_type == "min_sec") { r = new RegExp("^[0-9]{0,2}$"); }
	else if (regex_type == "pct_error") { r = new RegExp("^(?!^[0]{2}.*$)[+-]?[0-9]{0,2}(\\.[0-9]{0,4})?$|^100$|^-100$"); }
	else if (regex_type == "pct_int") { r = new RegExp("^$|^0$|^100$|^[1-9][0-9]?$"); }
	else if (regex_type == "comment") { r = new RegExp("^[^`~]{0," + regex_arg_1 + "}$"); }
	else
	{
		apex.message.alert("Unknown regex parameter in validateKeypress()");
		return false;
	}
	if (key_code == 8) // backspace
	{
		if (selection_length === 0)
		{
			// caret at start position and hitting backspace
			if (caret == 0) { return false; }
			// construct string with 1 key removed before caret
			else { constructed_str = input_str.substring(0, (caret - 1)) + post_selection_text; }
		}
		// construct string with user highlighted portion removed
		else { constructed_str = pre_selection_text + post_selection_text; }
	}
	else if (key_code == 46) // delete
	{
		if (selection_length === 0)
		{
			// caret at end position and hitting delete
			if (caret == input_str.length) { return false; }
			else { constructed_str = pre_selection_text + input_str.substring((caret + 1), input_str.length); }
		}
		// construct string with user highlighted portion removed
		else { constructed_str = pre_selection_text + post_selection_text; }
	}
	// 107 = numpad plus key, 187 = top row plus key
	else if (key_code == 107 || (key_code == 187 && event.shiftKey)) { constructed_str = pre_selection_text + "+" + post_selection_text; }
	// 109 = numpad minus key, 189 = top row minus key
	else if (key_code == 109 || key_code == 189) { constructed_str = pre_selection_text + "-" + post_selection_text; }
	// 110 = numpad decimal key, 190 = main row decimal key
	else if (key_code == 110 || key_code == 190)  { constructed_str = pre_selection_text + "." + post_selection_text; }
	// construct string with any other user key
	else { constructed_str = pre_selection_text + key + post_selection_text; }
	return r.test(constructed_str);
}