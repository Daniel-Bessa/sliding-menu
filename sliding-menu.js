(function(){
  let _shadowRoot;
  let _id;
  let _password;

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
  `

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
  }

  connectedCallback(){}




})