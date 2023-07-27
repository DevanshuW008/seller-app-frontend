import React, { useState } from "react";
import { Edit, ExpandMore } from "@mui/icons-material";
import AddCustomization from "./AddCustomization";
import { Button, Menu, MenuItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { customizationFields } from "./fields";
import RenderInput from "../../../../utils/RenderInput";

const containerClasses = "flex items-center";
const inputClasses = "w-80 h-full px-2.5 py-3.5 text-[#606161] bg-transparent !border-black flex";
const labelClasses = "w-40 my-4 text-sm py-2 ml-1 font-medium text-left text-[#606161] inline-block";

const Customization = (props) => {
  const { customization, customizations, handleCustomizationChange, customizationGroups, setCustomizations } = props;

  const [showExistingGroups, setShowExistingGroups] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [customizationDetails, setCustomizationDetails] = useState({});

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
    setShowExistingGroups(false);
  };

  const updateCustomizationDetail = () => {
    const updatedCustomization = customizations.find((c) => c.id === customizationDetails.id);
    if (updatedCustomization) {
      const updatedCustomizationCopy = { ...updatedCustomization, ...customizationDetails };
      const updatedCustomizations = customizations.map((c) =>
        c.id === customizationDetails.id ? updatedCustomizationCopy : c
      );
      handleCustomizationChange(updatedCustomizations);
      setShowCustomizationModal(false);
    }
  };

  const handleAddNewGroup = (e) => {
    e.stopPropagation();
    props.setSelectedCustomization(customization);
    props.setShowCustomizationGroupModal(true);
    handleMenuClose();
  };

  const handleChooseExistingGroup = (e) => {
    e.stopPropagation();
    setShowExistingGroups(true);
  };

  const handleChooseGroup = (groupId) => {
    const selectedCustomizationIndex = customizations.findIndex((c) => c.id === customization.id);
    const updatedCustomizations = [...customizations];
    updatedCustomizations[selectedCustomizationIndex] = {
      ...updatedCustomizations[selectedCustomizationIndex],
      child: groupId,
    };
    setCustomizations(updatedCustomizations);
    handleMenuClose();
  };

  const renderValidGroupOptions = () => {
    const parentIndex = customizationGroups.findIndex((g) => g.id === customization.parent);
    const parentSeq = parseInt(customizationGroups[parentIndex].seq);
    const validGroups = customizationGroups.filter((group) => parseInt(group.seq) > parentSeq);

    if (validGroups.length === 0) {
      return (
        <MenuItem key="no-valid-group" onClick={(e) => e.stopPropagation()}>
          <ListItemText primary="No valid groups available" />
        </MenuItem>
      );
    }

    return validGroups.map((group) => (
      <MenuItem key={group.id} onClick={() => handleChooseGroup(group.id)}>
        <ListItemText primary={`Group ${group.id} - ${group.name}`} />
      </MenuItem>
    ));
  };

  const parentGroup = customizationGroups.find((group) => group.id === customization.parent);
  const shouldShowButton = !customization.child && parentGroup && parentGroup.seq < 3;

  return (
    <>
      <Accordion
        style={{
          ...props.styles,
          backgroundColor: "#1876d221",
          border: "2.5px solid #ffffff",
          borderRadius: 8,
          marginTop: 10,
          marginBottom: 10,
          position: "unset",
        }}
        onClick={() => setCustomizationDetails(customization)}
      >
        <AccordionSummary expandIcon={<ExpandMore />} style={{ borderRadius: 8 }}>
          <div key={customization.id}>
            <div className="flex">
              <span className="flex items-center">
                <p className="text-[#181818] text-medium">{customization.id}- &nbsp;</p>
                <p className="text-[#000000] text-medium">{customization.name}, &nbsp;</p>
                <p className="text-[#000000] text-medium">Price- &nbsp;</p>
                <p className="text-[#000000] text-medium">{customization.price} Rupees</p>
              </span>
              <div className="flex align-center">
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ marginLeft: 2, fontSize: 12 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomizationDetails(customization);
                    setShowCustomizationModal(true);
                  }}
                >
                  <Edit />
                </Button>
              </div>
              {shouldShowButton && (
                <div>
                  <Button size="small" variant="outlined" sx={{ marginLeft: 2 }} onClick={handleMenuOpen}>
                    Add Customization Group
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {showExistingGroups ? (
                      renderValidGroupOptions()
                    ) : (
                      <div>
                        <MenuItem onClick={handleAddNewGroup}>
                          <ListItemText primary="Add New Group" />
                        </MenuItem>
                        <MenuItem onClick={handleChooseExistingGroup}>
                          <ListItemText primary="Choose Existing Group" />
                        </MenuItem>
                      </div>
                    )}
                  </Menu>
                </div>
              )}
            </div>
            <AddCustomization
              mode="edit"
              showModal={showCustomizationModal}
              handleCloseModal={() => setShowCustomizationModal(false)}
              newCustomizationData={customizationDetails}
              setNewCustomizationData={setCustomizationDetails}
              handleAddCustomization={updateCustomizationDetail}
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-auto">
            {customizationFields.map((field) => {
              const modifiedField = {
                ...field,
                isDisabled: true,
              };

              return (
                <RenderInput
                  item={modifiedField}
                  state={customizationDetails}
                  stateHandler={setCustomizationDetails}
                  key={field?.id}
                  containerClasses={containerClasses}
                  labelClasses={labelClasses}
                  inputClasses={inputClasses}
                  inputStyles={field?.inputStyles}
                />
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Customization;
