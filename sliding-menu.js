(function(){
  let _shadowRoot;
  let _id;
  let _password;

  let cenas;

  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
  <style>
  </style>
  <div id="ui5_content" name="ui5_content">
    <slot name="content"></slot>
  </div>

  <script id="oView" name="oView" type="sapui5/xmlview">
    <mvc:View
      controllerName="sap.tnt.sample.NavigationList.C"
      xmlns="sap.m"
      xmlns:mvc="sap.ui.core.mvc"
      xmlns:tnt="sap.tnt"
      height="100%">
      <OverflowToolbar>
          <Button
              text="Toggle Collapse/Expand"
              icon="sap-icon://menu2"
              press=".onCollapseExpandPress" />
          <Button
              text="Show/Hide SubItem 3"
              icon="sap-icon://menu2"
              press=".onHideShowSubItemPress" />
        </OverflowToolbar>

      <tnt:NavigationList
          id="navigationList"
          width="320px"
          selectedKey="subItem3">
          <tnt:NavigationListItem text="Item 1" key="rootItem1" icon="sap-icon://employee">
              <tnt:NavigationListItem text="Sub Item 1" />
              <tnt:NavigationListItem text="Sub Item 2" />
              <tnt:NavigationListItem text="Sub Item 3" id="subItemThree" key="subItem3" />
              <tnt:NavigationListItem text="Sub Item 4" />
              <tnt:NavigationListItem text="Invisible Sub Item 5" visible="false" />
              <tnt:NavigationListItem text="Invisible Sub Item 6" visible="false" />
          </tnt:NavigationListItem>
          <tnt:NavigationListItem
              text="Invisible Section"
              icon="sap-icon://employee"
              visible="false">
              <tnt:NavigationListItem text="Sub Item 1" />
              <tnt:NavigationListItem text="Sub Item 2" />
              <tnt:NavigationListItem text="Sub Item 3" />
              <tnt:NavigationListItem text="Sub Item 4" />
          </tnt:NavigationListItem>
          <tnt:NavigationListItem text="Item 2" icon="sap-icon://building">
              <tnt:NavigationListItem text="Sub Item 1" />
              <tnt:NavigationListItem text="Sub Item 2" />
              <tnt:NavigationListItem text="Sub Item 3" />
              <tnt:NavigationListItem text="Sub Item 4" />
            </tnt:NavigationListItem>
      </tnt:NavigationList>
    </mvc:View>
  </script>
  `;

  class SlidingMenu extends HTMLElement {
    
    constructor() {
      super();

      _shadowRoot = this.attachShadow({
        mode: "open"
      });
      _shadowRoot.appendChild(tmpl.content.cloneNode(true));

      _id = createGuid();

      _shadowRoot.querySelector("#oView").id = _id + "oView";

      this._export_settings = {};
      // this._export_settings.password = "";

      this.addEventListener("click", event => {
        console.log('click');
      });
    }

    connectedCallback() {};

    disconnectedCallback() {
      if (this._subscription) { 
        this._subscription();
        this._subscription = null;
      }
    } 

    onCustomWidgetBeforeUpdate(changedProperties) {
      if ("designMode" in changedProperties) {
        this._designMode = changedProperties["designMode"];
      }
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      loadthis(this);
    }

    _firePropertiesChanged() {
    }

  }

  customElements.define("com-sap-sample-sliding-menu", SlidingMenu);

  function loadthis(that) {
    var that_ = that;
  
    let content = document.createElement('div');
    content.slot = "content";
    that_.appendChild(content);

    sap.ui.getCore().attachInit(function() {
        "use strict";

        //### Controller ###
        sap.ui.define([
            "jquery.sap.global",
            "sap/ui/core/mvc/Controller"
        ], function(jQuery, Controller) {
            "use strict";

            return Controller.extend("myView.Template", {
                onButtonPress: function(oEvent) {
                    _password = oView.byId("passwordInput").getValue();
                    that._firePropertiesChanged();
                    console.log(_password);

                    this.settings = {};
                    this.settings.password = "";

                    that.dispatchEvent(new CustomEvent("onStart", {
                        detail: {
                            settings: this.settings
                        }
                    }));
                } 
            });
        });

        //### THE APP: place the XMLView somewhere into DOM ###
        var oView  = sap.ui.xmlview({
            viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
        });
        oView.placeAt(content);


        if (that_._designMode) {
            oView.byId("passwordInput").setEnabled(false);
        }
    });
  }

})