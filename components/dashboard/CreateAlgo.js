import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
//import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import RangeSlider from "react-bootstrap-range-slider";
import { CheckboxChecked } from "@carbon/icons-react";
import { createstrategy } from "@/functions/request";

function CreateAlgo() {
  const hourRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();
  const userId = localStorage.getItem("userId");
 
  const initialCheckoutValues = {
    userId: userId,
    algoName: "",
    isActive: true,
    productType: "mis",
    days: "1",
    runningStatus: "hello",
    underlying: "spot",
    so_type: "all_leg",
    entryTime: "9:20:00",
    exitTime: "9:21:00",
    sl_c2c: true,
    m2m_sl: 0,
    m2m_tp: "1",
    enable_slicing: true,
    slicing_lots: "1",
    legs: {
      name: "hello chawla",
      instrumentName: "banknifty",
      segment: "fut",
      optionType: "ce",
      txnType: "buy",
      isWeekly: true,
      strike: {
        type: "point",
        value: 1,
      },
      lots: 1,
      per_lot_qty: 1,
      sl: {
        type: "point",
        value: 1,
      },
      tg: {
        type: "point",
        value: 1,
      },
      trailingSLConfig: {
        type: "point",
        value: 1,
      },
      re_execute: false,
      re_execute_time: 1,
      re_entry_enabled: false,

      waitntrade_enabled: false,
    },
  };

  const [values, setValues] = useState(initialCheckoutValues);

  const handleSave = (e) => {
    // const hour = hourRef.current.value;
    // const minute = minuteRef.current.value;
    // const second = secondRef.current.value;

    // const entryTimes = `${hour}:${minute}:${second}`;

    setValues({
      ...values,
      [e.target.name]: e.target.value,
      
    });
  };

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    try {
      console.log(values);
      let json = await createstrategy(values);

      if (json?.code > 202) {
        setHasError(true);
        setErrorMessage(json?.message);
        console.log("main error : ", json?.message);
      } else {
        console.log(json);
      }
    } catch (err) {
      setHasError(true);
      console.log("error : ", err);
    }
  };

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 5000);
    }
  }, [hasError]);

  const instrumentOptions = ["banknifty", "nifty", "finnifty"];
  const legOptions = [
    "Legs",
    "Premium close to",
    "Premium > than",
    "Premium < than",
    "ATM %",
    "Straddle with",
  ];
  const tgtOptions = ["TGT", "TGT", "TGT", "TGT", "None"];
  const eoOptions = ["Market", "Limit"];
  const calculateEntry = ["LTP", "Average entry price"];
  const calculateExit = ["LTP", "Average entry price"];
  const trailingOptions = ["1", "3", "5", "10", "15"];
  const trailingOptionss = ["Minutes", "Seconds"];
  const entryOrderDelay = [
    "No delay",
    "Daily entry of Sell positions",
    "Daily entry of Buy positions",
  ];
  const exitOrderDelay = [
    "No delay",
    "Daily exit of Sell positions",
    "Daily exit of Buy positions",
  ];
  const mtmOptions = ["MTM", "MTM", "None"];
  const iOptions = ["TGT", "TGT", "TGT", "TGT", "None"];
  const slOptions = ["SL", "SL", "SL", "SL", "None"];
  const tOptions = ["None"];
  const segmentOptions = ["Options", "Futures"];
  const strikeOptions = ["ITM 10", "ITM 9", "ITM 8", "ITM 7"];
  const durationOptions = ["STBT/BTST", "(N) days before expiry"];
  const [sliderValue, setSliderValue] = useState(0);
  const demoOptions = ["demo 1", "demo 2", "demo 3", "demo 4"];

  const [className, setClassName] = useState("btn btn-outline-success");

  const [message, setMessage] = useState("Buy");
  const [mis, setMis] = useState("MIS");
  const [ce, setCe] = useState("CE");

  const [tradeType, setTradeType] = useState(5);

  const handleTradeTypeChange = (value) => {
    setTradeType(value);
  };

  // Buy/Sell button

  const handleBuySell = () => {
    if (className === "btn btn-outline-success") {
      setClassName("btn btn-outline-danger");
      setMessage("Sell");
    } else {
      setClassName("btn btn-outline-success");
      setMessage("Buy");
    }
  };

  // Mis/Nrml button

  const handleMisNrml = () => {
    if (mis === "MIS") {
      setMis("NRML");
    } else {
      setMis("MIS");
    }
  };

  // CE/PE button

  const handleCePe = () => {
    if (ce == "CE") {
      setCe("PE");
    } else {
      setCe("CE");
    }
  };

  var item1 = [9],
    item2 = [0];
  for (var i = 10; i <= 15; i++) {
    item1.push(i);
  }
  for (var i = 1; i <= 59; i++) {
    item2.push(i);
  }

  const [selectedSegment, setSelectedSegment] = useState(segmentOptions[0]);
  const [forms, setForms] = useState([]);

  const addForm = () => {
    const newForm = {
      underlying: "Spot",
      tradeType: 6,
      duration: durationOptions[0],
    };
    setForms([...forms, newForm]);
  };

  const duplicateForm = (index) => {
    const duplicatedForm = { ...forms[index] };
    setForms([...forms, duplicatedForm]);
  };
  const deleteForm = (index) => {
    const updatedForms = [...forms];
    updatedForms.splice(index, 1);
    setForms(updatedForms);
  };

  const [inputEnabled, setInputEnabled] = useState(false);
  const [inputtEnabled, setInputtEnabled] = useState(false);
  const [inputttEnabled, setInputttEnabled] = useState(false);

  const [modale, setModale] = useState(false);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribedd, setIsSubscribedd] = useState(false);

  
  const [checked, setChecked] = useState(false);
  const [checkedd, setCheckedd] = useState(false);
  const [checkeddd, setCheckeddd] = useState(false);

  const handleChange = (event) => {
    if (event.target.checked) {
      setChecked(true);
      console.log("✅ Checkbox is checked");
    } else {
      setChecked(false);
      console.log("⛔️ Checkbox is NOT checked");
    }
    setIsSubscribed((current) => !current);
  };
  const handleChanged = (event) => {
    if (event.target.checked) {
      setCheckedd(true);
      console.log("✅ Checkbox is checked");
    } else {
      setCheckedd(false);
      console.log("⛔️ Checkbox is NOT checked");
    }
    setIsSubscribedd((current) => !current);
  };
  const handleChangedd = (event) => {
    if (event.target.checked) {
      setCheckeddd(true);
      console.log("✅ Checkbox is checked");
    } else {
      setCheckeddd(false);
      console.log("⛔️ Checkbox is NOT checked");
    }
    setIsSubscribedd((current) => !current);
  };

  const [isTargetNone, setIsTargetNone] = useState(true);
  const [isStoplossNone, setIsStoplossNone] = useState(true);

  // MMT Target type

  const handleTargetChange = (selectedOption) => {
    if (selectedOption?.label === "None") {
      setIsTargetNone(false);
    } else {
      setIsTargetNone(true);
    }
  };

  // MMT Stoploss type

  const handleStoplossChange = (selectedOption) => {
    if (selectedOption?.label === "None") {
      setIsStoplossNone(false);
    } else {
      setIsStoplossNone(true);
    }
  };

  // Exit order type -> Market

  const [isExitM, setIsExitM] = useState(false);

  const handleExitDropdown = (selectedOption) => {
    if (selectedOption.label === "Market") {
      setIsExitM(true);
    } else {
      setIsExitM(false);
    }
  };

  // Entry order type -> Market

  const [isEntryM, setIsEntryM] = useState(false);

  const handleEntryDropdown = (selectedOption) => {
    if (selectedOption.label === "Market") {
      setIsEntryM(true);
    } else {
      setIsEntryM(false);
    }
  };

  return (
    <div style={{ margin: "15vh 7vw" }}>
      <Form.Label htmlFor="Algo name">Algo name</Form.Label>
      <Form.Control
        type="text"
        name="algoName"
        onChange={handleSave}
        style={{ width: "30vw", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      />
      <h3>
        <Form.Label
          htmlFor="Instrument"
          style={{ color: "gray", margin: "5vh 0" }}
        >
          POSITIONS
        </Form.Label>
      </h3>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "7vh 0",
          }}
        >
          <div>
            <Form.Label htmlFor="Instrument">Instrument</Form.Label>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
              <Dropdown
                name="instrumentName"
                options={instrumentOptions}
                value={instrumentOptions[0]}
                placeholder="Select an option"
              />
            </div>
          </div>
          <div>
            <Form.Label htmlFor="Segment">Segment</Form.Label>
            <Dropdown
              name="segment"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              options={segmentOptions}
              value={selectedSegment}
              onChange={(selected) => setSelectedSegment(selected)}
              placeholder="Select an option"
            />
          </div>

          {selectedSegment.label === "Futures" ? (
            <>
              <div>
                <Form.Label htmlFor="Segment2">Buy / Sell</Form.Label>
                <br />
                <ToggleButtonGroup
                  type="radio"
                  name="txnType"
                  defaultValue={3}
                >
                  <ToggleButton
                    id="tbg-radio-3"
                    variant="outline-success"
                    value={3}
                  >
                    Buy
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-radio-4"
                    variant="outline-danger"
                    value={4}
                  >
                    Sell
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div>
                <Form.Label htmlFor="Quantity (Lots)">
                  Quantity (Lots)
                </Form.Label>
                <Form.Control
                  name="quantity"
                  type="text"
                  id="Quantity"
                  style={{
                    width: "9vw",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                />
              </div>
              <div>
                <Button
                  name="leg"
                  variant="primary"
                  style={{ margin: "5vh 0" }}
                  onClick={addForm}
                >
                  Add Leg
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Form.Label htmlFor="Segment1">Options</Form.Label>
                <br />
                <ToggleButtonGroup
                  type="radio"
                  name="optionType"
                  defaultValue={1}
                >
                  <ToggleButton
                    id="tbg-radio-1"
                    variant="outline-primary"
                    value={1}
                  >
                    CE
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-radio-2"
                    variant="outline-primary"
                    value={2}
                  >
                    PE
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div>
                <Form.Label htmlFor="Segment">Strike</Form.Label>
                <Dropdown
                  name="strike"
                  options={strikeOptions}
                  value={strikeOptions[0]}
                  placeholder="Select an option"
                />
              </div>

              <div>
                <Form.Label htmlFor="Segment2">Buy / Sell</Form.Label>
                <br />
                <ToggleButtonGroup
                  type="radio"
                  name="txnType"
                  defaultValue={3}
                >
                  <ToggleButton
                    id="tbg-radio-3"
                    variant="outline-success"
                    value={3}
                  >
                    Buy
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-radio-4"
                    variant="outline-danger"
                    value={4}
                  >
                    Sell
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div>
                <Form.Label htmlFor="Quantity (Lots)">
                  Quantity (Lots)
                </Form.Label>
                <Form.Control
                  name="quantity"
                  type="text"
                  id="Quantity"
                  style={{ width: "9vw" }}
                />
              </div>
              <div>
                <Button
                  name="leg"
                  variant="primary"
                  style={{ margin: "5vh 0" }}
                  onClick={addForm}
                >
                  Add Leg
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Render the forms */}
        {forms.map((form, index) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: "7vh 0",
            }}
          >
            <div>
              <button
                name="txnType"
                type="button"
                className={className}
                onClick={handleBuySell}
              >
                {message}
              </button>
            </div>
            <div>
              <button
                name="productType"
                type="button"
                className="btn btn-outline-primary"
                onClick={handleMisNrml}
              >
                {mis}
              </button>
            </div>
            <div>
              <Dropdown
                name="premium"
                options={legOptions}
                value="Legs"
                placeholder="Select an option"
              />
            </div>
            <div>
              <button
                onClick={() => {
                  setModale(!modale);
                }}
              >
                ATM
              </button>
            </div>
            {modale ? (
              <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Modal title</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div>
              <button
                name="optionType"
                type="button"
                className="btn btn-outline-primary"
                onClick={handleCePe}
              >
                {ce}
              </button>
            </div>
            <div>
              <input value={"1x"}></input>
            </div>
            <div>
              {checked ? (
                <div>
                  <Dropdown
                    options={iOptions}
                    value="None"
                    placeholder="Select an option"
                    onChange={(selectedOption) => {
                      const isInputEnabled = selectedOption.value !== "None";
                      setInputEnabled(isInputEnabled);
                    }}
                  />
                  <div>
                    <input disabled={!inputEnabled} />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div>
                <Dropdown
                  name="tg"
                  options={tgtOptions}
                  value="None"
                  placeholder="Select an option"
                  onChange={(selectedOption) => {
                    const isInputtEnabled = selectedOption.value !== "None";
                    setInputtEnabled(isInputtEnabled);
                  }}
                />
                <div>
                  <input disabled={!inputtEnabled} />
                </div>
              </div>
              {checkedd ? (
                <div>
                  <Dropdown
                    name="sl"
                    options={slOptions}
                    value="None"
                    placeholder="Select an option"
                    onChange={(selectedOption) => {
                      const isInputEnabled = selectedOption.value !== "None";
                      setInputEnabled(isInputEnabled);
                    }}
                  />
                  <div>
                    <input disabled={!inputEnabled} />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div>
                <Dropdown
                  name="sl"
                  options={slOptions}
                  value="None"
                  placeholder="Select an option"
                  onChange={(selectedOption) => {
                    const isInputttEnabled = selectedOption.value !== "None";
                    setInputttEnabled(isInputttEnabled);
                  }}
                />
                <div>
                  <input disabled={!inputttEnabled} />
                </div>
              </div>
              {checkedd ? (
                <div>
                  <Dropdown
                    name="sl"
                    options={slOptions}
                    value="None"
                    placeholder="Select an option"
                    onChange={(selectedOption) => {
                      const isInputEnabled = selectedOption.value !== "None";
                      setInputEnabled(isInputEnabled);
                    }}
                  />
                  <div>
                    <input disabled={!inputEnabled} />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div>
                <Dropdown
                  options={tOptions}
                  name="trailingSLConfig"
                  value="None"
                  placeholder="Select an option"
                  onChange={(selectedOption) => {
                    const isInputEnabled = selectedOption.value !== "None";
                    setInputEnabled(isInputEnabled);
                  }}
                />
                <div>
                  <input disabled={!inputEnabled} />
                </div>
              </div>
            </div>

            <div>
              <Dropdown
                options={legOptions}
                value="Legs"
                placeholder="Select an option"
              />
            </div>
            <div>
              <button
                name="optionType"
                type="button"
                className="btn btn-outline-primary"
                onClick={handleCePe}
              >
                {ce}
              </button>
            </div>
            <div>
              <Button variant="danger" onClick={() => deleteForm(index)}>
                Delete
              </Button>
            </div>
            <div>
              <Button variant="secondary" onClick={() => duplicateForm(index)}>
                Duplicate
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "7vh 0",
        }}
      >
        <div>
          <input
            name="movesl"
            type="checkbox"
            style={{ marginRight: "0.5vw" }}
          />{" "}
          Move SL to Cost
        </div>
        <div>
          <input
            type="checkbox"
            value={isSubscribed}
            onChange={handleChange}
            id="subscribe"
            name="waitntrade_enabled"
          />
          Wait & Trade
        </div>
        {checked ? (
          <div>
            <input
              name="trade"
              type="checkbox"
              style={{ marginRight: "0.5vw" }}
            />{" "}
            Trade only first entry
          </div>
        ) : (
          <></>
        )}
        <div>
          <input
            type="checkbox"
            value={isSubscribedd}
            onChange={handleChanged}
            id="subscribe"
            name="re_entry_enabled"
            style={{ marginRight: "0.5vw" }}
          />
          Re-entry / Re-execute
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "7vh 0",
        }}
      >
        <div>
          <Form.Label htmlFor="Quantity (Lots)">Underlying</Form.Label>
          <br />
          <Button name="underlying" variant="primary">
            Spot
          </Button>
        </div>

        <div>
          <Form.Label>Trade type</Form.Label>
          <br />
          <ToggleButtonGroup
            name="tradetype"
            type="radio"
            value={tradeType}
            onChange={handleTradeTypeChange}
          >
            <ToggleButton id="tbg-radio-5" variant="outline-primary" value={5}>
              Intraday
            </ToggleButton>
            <ToggleButton id="tbg-radio-6" variant="outline-primary" value={6}>
              Positional
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {tradeType === 6 && (
          <div>
            {/* POSTIONAL */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "7vh 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Form.Label>Start Time</Form.Label>
                <br />
                <div style={{ display: "flex" }}>
                  <Dropdown
                    name="sh"
                    options={item1}
                    value={item2[0]}
                    placeholder="00"
                    ref={hourRef}
                  />
                  <Dropdown
                    name="sm"
                    options={item2}
                    value={item2[0]}
                    placeholder="00"
                    ref={minuteRef}
                  />
                  <Dropdown
                    name="ss"
                    options={item2}
                    value={item2[0]}
                    placeholder="00"
                    ref={secondRef}
                  />
                </div>
              </div>
              <div>
                <Form.Label>Next Day End Time</Form.Label>
                <br />
                <div style={{ display: "flex" }}>
                  <Dropdown
                    name="eh"
                    options={item1}
                    value={item2[0]}
                    placeholder="00"
                  />
                  <Dropdown
                    name="em"
                    options={item2}
                    value={item2[0]}
                    placeholder="00"
                  />
                  <Dropdown
                    name="es"
                    options={item2}
                    value={item2[0]}
                    placeholder="00"
                  />
                </div>
              </div>
              <div>
                <Form.Label>Check condition next day after (Time)</Form.Label>
                <br />
                <div style={{ display: "flex" }}>
                  <Dropdown
                    name="nh"
                    options={item1}
                    value={item2[0]}
                    placeholder="00"
                  />
                  <Dropdown
                    name="nm"
                    options={item2}
                    value={item2[0]}
                    placeholder="00"
                  />
                  <Dropdown
                    name="ns"
                    options={item2}
                    value={item2[0]}
                    placeholder="00"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {tradeType === 5 && (
          <div>
            {/* INTRADAY */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "7vh 0",
              }}
            >
              <div>
                <Form.Label>Start Time</Form.Label>
                <br />
                <div style={{ display: "flex" }}>
                  <Dropdown options={item1} value={item2[0]} placeholder="00" />
                  <Dropdown options={item2} value={item2[0]} placeholder="00" />
                  <Dropdown options={item2} value={item2[0]} placeholder="00" />
                </div>
              </div>
              <div>
                <Form.Label>End Time</Form.Label>
                <br />
                <div style={{ display: "flex" }}>
                  <Dropdown options={item1} value={item2[0]} placeholder="00" />
                  <Dropdown options={item2} value={item2[0]} placeholder="00" />
                  <Dropdown options={item2} value={item2[0]} placeholder="00" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          margin: "3vh 0",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ width: "45%", textAlign: "center" }}>
          <h3>
            <Form.Label style={{ color: "gray", margin: "5vh 0" }}>
              MMT TARGET
            </Form.Label>
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              textAlign: "left",
            }}
          >
            <div>
              <Form.Label>Type</Form.Label>
              <Dropdown
                name="m2m_tp"
                options={mtmOptions}
                value={mtmOptions[0]}
                placeholder="Select any option"
                onChange={handleTargetChange}
              />
            </div>
            <div>
              <Form.Label>Value</Form.Label>
              <InputGroup className="mb-3" disabled={true}>
                <InputGroup.Text>%</InputGroup.Text>
                <Form.Control aria-label="" disabled={!isTargetNone} />
              </InputGroup>
            </div>
          </div>
          <div style={{ textAlign: "left", margin: "2vh 0" }}>
            <Form.Label>MTM Re-entry</Form.Label>
            <Dropdown
              disabled={!isTargetNone}
              options={demoOptions}
              value={demoOptions[0]}
              placeholder="Select any option"
            />
          </div>
          <div style={{ textAlign: "left", margin: "2vh 0" }}>
            <Form.Label>Max no. of re-entries</Form.Label>
            <Dropdown
              disabled={!isTargetNone}
              options={demoOptions}
              value={demoOptions[0]}
              placeholder="Select any option"
            />
          </div>
          <div style={{ textAlign: "left", margin: "2vh 0" }}>
            <Form.Label>Action</Form.Label>
            <Dropdown
              disabled={!isTargetNone}
              options={demoOptions}
              value={demoOptions[0]}
              placeholder="Select any option"
            />
          </div>
        </div>
        <div style={{ width: "45%", textAlign: "center" }}>
          <h3>
            <Form.Label style={{ color: "gray", margin: "5vh 0" }}>
              MMT STOPLOSS
            </Form.Label>
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              textAlign: "left",
            }}
          >
            <div>
              <Form.Label>Fixed Stoploss</Form.Label>
              <Dropdown
                name="m2m_sl"
                options={mtmOptions}
                value={mtmOptions[0]}
                placeholder="Select any option"
                onChange={handleStoplossChange}
              />
            </div>
            <div>
              <Form.Label>Value</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>%</InputGroup.Text>
                <Form.Control aria-label="" disabled={!isStoplossNone} />
              </InputGroup>
            </div>
          </div>
          <div style={{ textAlign: "left", margin: "2vh 0" }}>
            <Form.Label>Profit lock and Trailing stoploss</Form.Label>
            <Dropdown
              options={demoOptions}
              value={demoOptions[0]}
              placeholder="Select any option"
            />
          </div>
          <div style={{ textAlign: "left", margin: "2vh 0" }}>
            <Form.Label>MTM Re-entry</Form.Label>
            <Dropdown
              disabled={!isStoplossNone}
              options={demoOptions}
              value={demoOptions[0]}
              placeholder="Select any option"
            />
          </div>
          <div style={{ textAlign: "left", margin: "2vh 0" }}>
            <Form.Label>Max no. of re-entries</Form.Label>
            <Dropdown
              disabled={!isStoplossNone}
              options={demoOptions}
              value={demoOptions[0]}
              placeholder="Select any option"
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <Form.Label>Action</Form.Label>
            <Dropdown
              disabled={!isStoplossNone}
              options={demoOptions}
              value={demoOptions[0]}
              placeholder="Select any option"
            />
          </div>
        </div>
      </div>
      <hr />

      <div style={{ margin: "5vh 0" }}>
        <h3>
          <Form.Label style={{ color: "gray", margin: "2vh 0" }}>
            PREMIUM MATCHING
          </Form.Label>
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "2vh 0",
          }}
        >
          <div>
            <div>
              <input
                type="checkbox"
                value={isSubscribedd}
                onChange={handleChangedd}
                id="subscribe"
                name="subscribe"
                style={{ marginRight: "0.5vw" }}
              />
              No matching of premiums
            </div>
          </div>
          <div>
            <div>
              <input type="checkbox" style={{ marginRight: "0.5vw" }} /> Match
              premiums with <br />
              maximum difference
            </div>
            <Form.Control
              disabled={checkeddd}
              type="text"
              id="Quantity"
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <div>
              <input type="checkbox" style={{ marginRight: "0.5vw" }} /> Premium
              close to:
            </div>
            <br />
            <Form.Control
              disabled={checkeddd}
              type="text"
              id="Quantity"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ width: "20%" }}>
            <div>
              <input type="checkbox" style={{ marginRight: "0.5vw" }} /> Premium
              range{" "}
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <Form.Control
                type="number"
                id="Quantity"
                disabled={checkeddd}
                style={{ width: "50%" }}
              />{" "}
              To
              <Form.Control
                type="number"
                disabled={checkeddd}
                id="Quantity"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div style={{ margin: "5vh 0" }}>
        <h3>
          <Form.Label style={{ color: "gray", margin: "2vh 0" }}>
            ADVANCED SETTINGS
          </Form.Label>
        </h3>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <Form.Label>Entry order type:</Form.Label>
            <Dropdown
              options={eoOptions}
              value={eoOptions[0]}
              placeholder="Select any option"
              onChange={handleEntryDropdown}
            />
            {console.log()}
          </div>
          {!isEntryM ? (
            <div>
              <Form.Label>Trigger & Limit price buffer in:</Form.Label>
              <Dropdown
                options={demoOptions}
                value={demoOptions[0]}
                placeholder="Select any option"
              />
            </div>
          ) : (
            <></>
          )}
          {!isEntryM ? (
            <div>
              <Form.Label>Trigger & Limit price buffer value:</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>%</InputGroup.Text>
                <Form.Control aria-label="" />
              </InputGroup>
            </div>
          ) : (
            <></>
          )}
          {!isEntryM ? (
            <div>
              <Form.Label>
                Entry with Market order if order Open for (N) secs:
              </Form.Label>
              <Form.Control type="number" id="Quantity" placeholder="sec" />
            </div>
          ) : (
            <></>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "3vh 0",
          }}
        >
          <div>
            <Form.Label>Exit order type:</Form.Label>
            <Dropdown
              options={eoOptions}
              value={eoOptions[0]}
              placeholder="Select any option"
              onChange={handleExitDropdown}
            />
          </div>
          {!isExitM ? (
            <div>
              <Form.Label>Trigger & Limit price buffer in:</Form.Label>
              <Dropdown
                options={demoOptions}
                value={demoOptions[0]}
                placeholder="Select any option"
              />
            </div>
          ) : (
            <></>
          )}
          {!isExitM ? (
            <div>
              <Form.Label>Trigger & Limit price buffer value:</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>%</InputGroup.Text>
                <Form.Control aria-label="" />
              </InputGroup>
            </div>
          ) : (
            <></>
          )}
          {!isExitM ? (
            <div>
              <Form.Label>
                Exit with Market order if order Open for (N) secs:
              </Form.Label>
              <Form.Control type="number" id="Quantity" placeholder="sec" />
            </div>
          ) : (
            <></>
          )}
          {isExitM ? (
            <div>
              <Form.Label>SL placement delay (individual leg):</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control aria-label="" />
                <InputGroup.Text>min:0, max:60</InputGroup.Text>
              </InputGroup>
            </div>
          ) : (
            <></>
          )}
          {isExitM ? (
            <div>
              <Form.Label>SL placement delay (MTM SL):</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control aria-label="" />
                <InputGroup.Text>min:0, max:60</InputGroup.Text>
              </InputGroup>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* if Exit order type -> Market M */}
        {!isExitM && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: "3vh 0",
            }}
          >
            <div>
              <Form.Label>SL order placement:</Form.Label>
              <Dropdown
                options={eoOptions}
                value={eoOptions[0]}
                placeholder="Select any option"
              />
            </div>
            <div>
              <Form.Label>SL placement delay (individual leg):</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control aria-label="" />
                <InputGroup.Text>min:0, max:60</InputGroup.Text>
              </InputGroup>
            </div>
            <div>
              <Form.Label>SL placement delay (MTM SL):</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control aria-label="" />
                <InputGroup.Text>min:0, max:60</InputGroup.Text>
              </InputGroup>
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "3vh 0",
          }}
        >
          <div>
            <Form.Label>Entry order delay:</Form.Label>
            <Dropdown
              options={entryOrderDelay}
              value={entryOrderDelay[0]}
              placeholder="Select any option"
            />
          </div>
          <div style={{ width: "20%" }}>
            <Form.Label>by (seconds)</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control aria-label="" />
              <InputGroup.Text>min:0, max:60</InputGroup.Text>
            </InputGroup>
          </div>
          <div>
            <Form.Label>Exit order delay:</Form.Label>
            <Dropdown
              options={exitOrderDelay}
              value={exitOrderDelay[0]}
              placeholder="Select any option"
            />
          </div>
          <div style={{ width: "20%" }}>
            <Form.Label>by (seconds)</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control aria-label="" />
              <InputGroup.Text>min:0, max:60</InputGroup.Text>
            </InputGroup>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "3vh 0",
          }}
        >
          <div>
            <Form.Label>Calculate entry from:</Form.Label>
            <Dropdown
              options={calculateEntry}
              value={calculateEntry[0]}
              placeholder="Select any option"
            />
          </div>
          <div style={{ width: "20%" }}>
            <Form.Label>Calculate exit from:</Form.Label>
            <Dropdown
              options={calculateExit}
              value={calculateExit[0]}
              placeholder="Select any option"
            />
          </div>
          <div>
            <Form.Label>Trailing frequency interval:</Form.Label>
            <div style={{ display: "flex" }}>
              <Dropdown
                options={trailingOptions}
                value={trailingOptions[0]}
                placeholder="Select any option"
              />
              <Dropdown
                options={trailingOptionss}
                value={trailingOptionss[0]}
                placeholder="Select any option"
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="success"
        style={{ margin: "2vh 45%" }}
        onClick={handleClick}
      >
        Save settings
      </Button>
    </div>
  );
}

export default CreateAlgo;
