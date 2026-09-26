import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const CORNER_VALUES = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

export default class AutoPiPPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const _ = this.gettext.bind(this);
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();

        // — Behaviour group —
        const behaviourGroup = new Adw.PreferencesGroup({ title: _('Behaviour') });
        page.add(behaviourGroup);

        const alwaysOnTopRow = new Adw.SwitchRow({
            title: _('Always on Top'),
            subtitle: _('Keep PiP window above all other windows'),
            active: settings.get_boolean('always-on-top'),
        });
        alwaysOnTopRow.connect('notify::active', () => {
            settings.set_boolean('always-on-top', alwaysOnTopRow.active);
        });
        behaviourGroup.add(alwaysOnTopRow);

        const alwaysOnAllWorkspacesRow = new Adw.SwitchRow({
            title: _('Always Visible on All Workspaces'),
            subtitle: _('Show PiP window on every workspace'),
            active: settings.get_boolean('always-on-all-workspaces'),
        });
        alwaysOnAllWorkspacesRow.connect('notify::active', () => {
            settings.set_boolean('always-on-all-workspaces', alwaysOnAllWorkspacesRow.active);
        });
        behaviourGroup.add(alwaysOnAllWorkspacesRow);

        const neverInFocusRow = new Adw.SwitchRow({
            title: _('Never in Focus'),
            subtitle: _('Return keyboard focus to another window after PiP takes it'),
            active: settings.get_boolean('never-in-focus'),
        });
        neverInFocusRow.connect('notify::active', () => {
            settings.set_boolean('never-in-focus', neverInFocusRow.active);
        });
        behaviourGroup.add(neverInFocusRow);

        const overviewRow = new Adw.SwitchRow({
            title: _('Do Not Show on Overview'),
            subtitle: _('Keep PiP out of workspace previews and thumbnails'),
            active: settings.get_boolean('do-not-show-on-overview'),
        });
        overviewRow.connect('notify::active', () => {
            settings.set_boolean('do-not-show-on-overview', overviewRow.active);
        });
        behaviourGroup.add(overviewRow);

        // — Window Position group —
        const positionGroup = new Adw.PreferencesGroup({ title: _('Window Position') });
        page.add(positionGroup);

        const cornerRow = new Adw.ComboRow({
            title: _('Corner'),
            model: new Gtk.StringList({
                strings: [
                    _('Top Left'),
                    _('Top Right'),
                    _('Bottom Right'),
                    _('Bottom Left'),
                ],
            }),
        });
        const currentCorner = settings.get_string('corner');
        cornerRow.selected = Math.max(0, CORNER_VALUES.indexOf(currentCorner));
        cornerRow.connect('notify::selected', () => {
            settings.set_string('corner', CORNER_VALUES[cornerRow.selected]);
        });
        positionGroup.add(cornerRow);

        const offsetRow = new Adw.SpinRow({
            title: _('Offset'),
            subtitle: _('Distance from the screen corner in pixels'),
            adjustment: new Gtk.Adjustment({
                lower: 0,
                upper: 50,
                step_increment: 1,
                value: settings.get_int('offset'),
            }),
        });
        offsetRow.connect('notify::value', () => {
            settings.set_int('offset', offsetRow.value);
        });
        positionGroup.add(offsetRow);

        window.add(page);
    }
}
