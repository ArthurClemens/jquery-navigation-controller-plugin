# Navigation Controller jQuery Plugin

version 0.2.1

## Features

This navigation controller makes it easy to set up a navigation by associating trigger elements to navigation pane elements.

By overriding the default options you keep full control over what should happen with `show` and `hide` events.

Opening and closing delays can set in the options. Delay (or hysteresis) is a feature commonly found in desktop interfaces (Mac OS X, Windows). Small delays before opening or closing menus can enhance usability a great deal.


## Usage

No HTML structure is forced - you can use any setup as you like - but the presets assume this structure:

        navigation
            triggers
                trigger-a
                trigger-b
                trigger-c
            panes
                pane-a
                pane-b
                pane-c

or

        navigation
            triggers
                trigger-a
                trigger-b
                trigger-c
            pane

Example html:

        <div class="nav">
            <ul>
                <li>
                    <a href="#" data-pane="wake" data-rel="trigger">wake</a>
                </li>
                <li>
                    <a href="#" data-pane="up" data-rel="trigger">up</a>
                </li>
            </ul>
            <div class="pane" data-pane="wake">
                contents...
            </div>
            <div class="pane" data-pane="up">
                contents...
            </div>
        </div>

Using this setup, a navigation controller is created with:
        
        $(".nav").navcontrol({
            options
        });


## Options
* `triggerSelector`: the jQuery selector of the trigger elements; default: `[data-rel=trigger]`
* `closeSelector`: the jQuery selector of the close button elements; default: `[data-rel=close]`
* `getId`: function that is called to retrieve the id for each trigger; by default the attribute "data-pane" is queried (and its value is stored as id)
* `getPane`: function that is called to retrieve the pane for each id; by default used this selector: ".pane[data-name='" + id + "']"
* `mayShow`: delegate function that defines if the navigation pane may be shown; by default returns true
* `show`: function that is called when showing the navigation pane; by default removes class "hidden" from the pane and add class "active" to the trigger
* `mayHide`: delegate function that defines if the navigation pane may be hidden; by default returns true
* `hide`: function that is called when hiding the navigation pane; by default adds class "hidden" to the pane and removes class "active" from the trigger
* `inDelay`: delay before opening the pane, in milleseconds; default 0
* `outDelay`: delay before closing the pane, in milleseconds; default 0

## Demo
See [working code and illustration of options](http://arthurclemens.github.com/jquery-navigation-controller-plugin/).


## License
The MIT License

Copyright (c) 2013 Arthur Clemens, arthur@visiblearea.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.