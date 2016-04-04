/**
 * Created by pepijn.bakker on 15-2-2016.
 */
import {Injectable} from 'angular2/core';

// See: http://log4javascript.org/

// Note: do not use imports from log4javascript above this require statement!
require('log4javascript');

@Injectable()
export class Log {

  private _log : log4javascript.Logger;
  private _popUpAppender : log4javascript.PopUpAppender;
  private _inPageAppender : log4javascript.InPageAppender;
  private _consoleVisible : boolean;
  private _windowVisible : boolean;

  constructor() {
    // Create the logger
    this._log = log4javascript.getLogger();

    // TODO: make sure we can capture logging on server side!
    var ajaxAppender = new log4javascript.AjaxAppender('http://127.0.0.1:8000/DEMOService/log');
    var jsonLayout = new log4javascript.JsonLayout();
    ajaxAppender.setLayout(jsonLayout);

    this._log.addAppender(ajaxAppender);

    var consoleAppender = new log4javascript.BrowserConsoleAppender();
    this._log.addAppender(consoleAppender);
  }

  info(message: string) {
    this._log.info(message);
  }

  warning(message: string) {
    this._log.warn(message);
  }

  error(object: any) {
    this._log.error(object);
  }

  debug(message: string) {
    this._log.debug(message);
  }

  toggleLoggingPopup() {
    if (this._popUpAppender == null) {
      // Create a PopUpAppender with default options
      this._popUpAppender = new log4javascript.PopUpAppender();
      // Change the desired configuration options
      this._popUpAppender.setFocusPopUp(true);
      this._popUpAppender.setNewestMessageAtTop(true);
      //this.popUpAppender.setThreshold(log4javascript.Level.INFO);
      //this._popUpAppender.setReopenWhenClosed(true);
      //this._popUpAppender.setWidth(700);
      //this._popUpAppender.setHeight(500);

      // Add the appender to the logger
      this._log.addAppender(this._popUpAppender);
    }

    if (this._windowVisible) {
      this._popUpAppender.hide();
      this._windowVisible = false;
      this._log.info('Hide the logging window');
    } else {
      this._popUpAppender.show();
      this._windowVisible = true;
      this._log.info('Show the logging window');
    }
  }

  toggleInPageLogging(element : HTMLElement) {
    if (this._inPageAppender == null) {
      this._inPageAppender = new log4javascript.InPageAppender(element);
      this._log.addAppender(this._inPageAppender);
    }

    if (this._consoleVisible) {
      this._inPageAppender.hide();
      this._consoleVisible = false;
      this._log.info('Hide the logging console');
    } else {
      this._inPageAppender.show();
      this._consoleVisible = true;
      this._log.info('Show the logging console');
    }
  }
}
