/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, ChangeEvent } from "react";
import { Icon } from "components/icon";
import discord_logo from "assets/icons/svgs/discord.svg";
import {
    Tabs,
    Tab,
    TabPanel,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Modal,
    ConfirmModal,
    Button,
    ButtonForm,
    Chart,
    Currency,
    CurrencyUnit,
    ChartMode,
    RadioGroup,
    Radio,
    RadioButton,
    SliderRange,
    MiddleSliderRange,
    useSliderRange,
    Label,
    Tooltip,
    Time,
    Timer,
    TimerShowType,
    TimerElementLabel,
    Progress,
    Loading,
    Input,
    ButtonWidth,
} from "@totemfi/ui-components";

const ExamplesSection: FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [radioGroupValue, setRadioGroupValue] = useState<number>(1);

    const epoch = new Date().getTime();
    const futureEpoch = new Date().getTime() * 1.00000005;

    const label = "In Progress";

    const prefixLabel = <span style={{ color: "#7d8598" }}>TOTM</span>;
    const suffixLabel = <span style={{ color: "#7d8598" }}>TOTM</span>;

    const [inputValue, setInputValue] = useState<number | string>(1000);
    const { calculatePercentFromValue } = useSliderRange(500, 2500); //pass min and max
    return (
        <div className="row">
            <br></br>
            <h2>----------- Tabs ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-8">
                    <Tabs
                        value={selectedTab}
                        onChange={(event: any, value: any) => {
                            setSelectedTab(value);
                        }}
                    >
                        <Tab>Token</Tab>
                        <Tab>RoadMap</Tab>
                        <Tab>Team & Investors</Tab>
                    </Tabs>
                    <Paper>
                        <TabPanel value={selectedTab} index={0}>
                            this is one
                        </TabPanel>
                        <TabPanel value={selectedTab} index={1}>
                            this is two
                        </TabPanel>
                        <TabPanel value={selectedTab} index={2}>
                            this is three
                        </TabPanel>
                    </Paper>
                </div>
            </div>
            <br></br>
            <h2>----------- Tabs hasBorder ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-8">
                    <Paper>
                        <Tabs
                            value={selectedTab}
                            onChange={(event: any, value: any) => {
                                setSelectedTab(value);
                            }}
                            hasBorder
                        >
                            <Tab>Token</Tab>
                            <Tab>RoadMap</Tab>
                            <Tab>Team & Investors</Tab>
                        </Tabs>
                        <TabPanel value={selectedTab} index={0}>
                            this is one
                        </TabPanel>
                        <TabPanel value={selectedTab} index={1}>
                            this is two
                        </TabPanel>
                        <TabPanel value={selectedTab} index={2}>
                            this is three
                        </TabPanel>
                    </Paper>
                </div>
            </div>
            <br></br>
            <h2>----------- Table ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-8">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th">Dessert</TableCell>
                                <TableCell component="th">Calories</TableCell>
                                <TableCell component="th">Fat&nbsp;(g)</TableCell>
                                <TableCell component="th">Carbs&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>4</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            <br></br>
            <h2>----------- Modal ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-8">
                    <button
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        show Modal
                    </button>
                </div>

                <Modal title="Modal Test Title" open={showModal} width="620" onClose={() => setShowModal(false)}>
                    Modal Test
                </Modal>
            </div>

            <br></br>
            <h2>----------- ConfirmModal ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-8">
                    <button
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        show Confirm Modal
                    </button>
                </div>

                <ConfirmModal
                    description={"ConfirmModal test description"}
                    iconComponent={<Icon src={discord_logo} />}
                    open={showConfirmModal}
                    onClose={() => {
                        setShowConfirmModal(false);
                    }}
                    confirmTitle="confirm"
                    cancelTitle="cancel"
                    onConfirm={() => {
                        setShowConfirmModal(false);
                    }}
                    onCancel={() => {
                        setShowConfirmModal(false);
                    }}
                    width="35"
                />
            </div>

            <br></br>
            <h2>----------- Button ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-3  p-10">
                    <Button
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button Default
                    </Button>
                </div>
                <div className="col-md-3  p-10">
                    <Button
                        buttonForm={ButtonForm.SECONDARY}
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button secondary
                    </Button>
                </div>
                <div className="col-md-3  p-10">
                    <Button
                        buttonForm={ButtonForm.SECONDARY_DARK}
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button secondary-dark
                    </Button>
                </div>
                <div className="col-md-3  p-10">
                    <Button
                        buttonForm={ButtonForm.SECONDARY_HIGH}
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button secondary-high
                    </Button>
                </div>
                <div className="col-md-3  p-10">
                    <Button
                        buttonForm={ButtonForm.DISABLED}
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button disabled
                    </Button>
                </div>
                <div className="col-md-3  p-10">
                    <Button
                        buttonForm={ButtonForm.OUTLINED}
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button outlined
                    </Button>
                </div>
                <div className="col-md-3  p-10">
                    <Button
                        buttonForm={ButtonForm.SIMPLE_OUTLINED}
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button simple-outlined
                    </Button>
                </div>
                <div className="col-md-3  p-10">
                    <Button
                        buttonForm={ButtonForm.LIST_ITEM}
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button list-item
                    </Button>
                </div>

                <div className="col-md-3  p-10">
                    <Button
                        width={ButtonWidth.FIT_CONTENT}
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button fit-content width
                    </Button>
                </div>
                <div className="col-md-3  p-10">
                    <Button
                        width={ButtonWidth.FIT_PARENT}
                        onClick={() => {
                            setShowConfirmModal(true);
                        }}
                    >
                        Button inherit width
                    </Button>
                </div>
            </div>

            <br></br>
            <h2>----------- Chart ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-5">
                    <Chart size={150} segments={{ "#7CA1CB": 80, "#345983": 20 }}>
                        Chart FILL
                    </Chart>
                </div>
                <div className="col-md-5">
                    <Chart size={150} mode={ChartMode.RADIAL} segments={{ "#7CA1CB": 80, "#345983": 20 }}>
                        Chart RADIAL
                    </Chart>
                </div>
            </div>

            <br></br>
            <h2>----------- Currency ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-3">
                    <Currency value="100" unit={CurrencyUnit.USDC} />
                </div>
                <div className="col-md-3">
                    <Currency value="100" unit={CurrencyUnit.TOTEM} />
                </div>
                <div className="col-md-3">
                    <Currency value="100" unit={CurrencyUnit.BTC} />
                </div>
                <div className="col-md-3">
                    <Currency value="100" unit={CurrencyUnit.DOLLAR} />
                </div>
            </div>

            <br></br>
            <h2>----------- Radio ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <RadioGroup
                    value={radioGroupValue}
                    onChange={(event: any) => {
                        setRadioGroupValue(event.target.value);
                    }}
                >
                    <Radio value={1}>
                        <div>
                            <p>test</p>
                        </div>
                    </Radio>
                    <Radio value={2}>two</Radio>
                    <Radio value={3}>three</Radio>
                </RadioGroup>
            </div>

            <br></br>
            <h2>----------- RadioButton ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <RadioGroup
                    value={radioGroupValue}
                    onChange={(event: any) => {
                        setRadioGroupValue(event.target.value);
                    }}
                >
                    <RadioButton value={1}>
                        <div>
                            <p>test</p>
                        </div>
                    </RadioButton>
                    <RadioButton value={2}>two</RadioButton>
                    <RadioButton value={3}>three</RadioButton>
                </RadioGroup>
            </div>
            <br></br>
            <h2>----------- SliderRange ----------- </h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <SliderRange min={500} max={2500} />
                </div>
            </div>

            <br></br>
            <h2>----------- SliderRange ----------- </h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <SliderRange min={500} max={2500} initialValue={700} />
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <h2>----------- SliderRange ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <SliderRange min={500} max={2500} size={20} />
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <h2>----------- SliderRange ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <SliderRange min={500} max={2500} size={20} thumbScale={2} />
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <h2>----------- SliderRange ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <SliderRange
                        min={500}
                        max={2500}
                        labels={[
                            { value: 0, present: "0%" },
                            { value: 100, present: "2500" },
                        ]}
                    />
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <h2>----------- SliderRange ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <SliderRange
                        min={500}
                        max={2500}
                        labels={[
                            { value: 500, present: "0" },
                            { value: 2500, present: "MAX" },
                        ]}
                    />
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <h2>----------- SliderRange ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <SliderRange
                        min={500}
                        max={2500}
                        labelBackground={true}
                        labels={[
                            { value: 500, present: "0" },
                            { value: 2500, present: "MAX" },
                        ]}
                    />
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <h2>----------- SliderRange ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <SliderRange
                        min={500}
                        max={2500}
                        initialValue={700}
                        labels={[
                            { value: 0, present: "0%" },
                            { value: 25, present: "25%" }, // isPercent is the way that we request to treat value: 25 as a percent value not a value between min and max
                            { value: 50, present: "50%" },
                            { value: 75, present: "75%" },
                            { value: 100, present: "100%" },
                        ]}
                    />
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <h2>----------- SliderRange ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <Tooltip pointTo={calculatePercentFromValue(20)} title="TITLE" description="Some Description">
                        <SliderRange
                            min={500}
                            max={2500}
                            initialValue={700}
                            labels={[
                                { value: 0, present: "0%" },
                                { value: 25, present: "25%" }, // isPercent is the way that we request to treat value: 25 as a percent value not a value between min and max
                                { value: 50, present: "50%" },
                                { value: 75, present: "75%" },
                                { value: 100, present: "100%" },
                            ]}
                        />
                    </Tooltip>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <h2>----------- SliderRangePresentation ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    {/* <SliderRangePresentation
                        presentation={[
                            { value: 0, present: "min", isPercent: false },
                            { value: 3440, present: "Current", isPercent: false },
                            { value: 8000, present: "MAX", isPercent: false },
                        ]}
                        sliderHeight={120}
                        currentPercent={70}
                        calculatePercentFromValue={calculatePercentFromValue(20)}
                        onPresentationClick={() => {}}
                    /> */}
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <h2>----------- MiddleSliderRange ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <MiddleSliderRange
                        min={500}
                        max={2500}
                        middlePointValue={1700}
                        labelBackground={true}
                        labels={[
                            { value: 500, present: "0" },
                            { value: 2500, present: "MAX" },
                        ]}
                    />
                </div>
            </div>

            <br></br>
            <h2>----------- Label ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-3">
                    <Label style={{ padding: "0.5em 2.2em" }} color="green">
                        Active
                    </Label>
                </div>
                <div className="col-md-3">
                    <Label style={{ padding: "0.5em 2.2em" }} color="red">
                        Active
                    </Label>
                </div>
                <div className="col-md-3">
                    <Label style={{ padding: "0.5em 2.2em" }} color="orange">
                        Active
                    </Label>
                </div>
                <div className="col-md-3">
                    <Label style={{ padding: "0.5em 2.2em" }} color="gray">
                        Active
                    </Label>
                </div>
            </div>

            <br></br>
            <h2>----------- Label filled ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-3">
                    <Label style={{ padding: "0.5em 2.2em" }} filled={true} color="green">
                        Active
                    </Label>
                </div>
                <div className="col-md-3">
                    <Label style={{ padding: "0.5em 2.2em" }} filled={true} color="red">
                        Active
                    </Label>
                </div>
                <div className="col-md-3">
                    <Label style={{ padding: "0.5em 2.2em" }} filled={true} color="orange">
                        Active
                    </Label>
                </div>
                <div className="col-md-3">
                    <Label style={{ padding: "0.5em 2.2em" }} filled={true} color="gray">
                        Active
                    </Label>
                </div>
            </div>

            <br></br>
            <h2>----------- Tooltip ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-3">
                    <Tooltip title="test" description="test">
                        Tooltip Test
                    </Tooltip>
                </div>
            </div>
            <br></br>
            <h2>----------- Time ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-6">
                    <Time epoch={epoch} />
                </div>
            </div>
            <br></br>
            <h2>----------- Timer ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <Timer epoch={futureEpoch} mode={TimerShowType.CIRCULAR_COLON} />
                    <br></br>
                    <Timer epoch={futureEpoch} mode={TimerShowType.COLON} />
                    <br></br>
                    <Timer epoch={futureEpoch} mode={TimerShowType.COMMA} />
                    <br></br>
                    <Timer epoch={futureEpoch} mode={TimerShowType.BOX} />
                    <br></br>
                    <Timer epoch={futureEpoch} fix={3} />
                    <br></br>
                    <Timer epoch={futureEpoch} hideSeconds={true} />
                    <br></br>
                    <Timer epoch={futureEpoch} autoCountdown={false} />
                    <br></br>
                    <Timer epoch={futureEpoch} labels={[TimerElementLabel.DAY, TimerElementLabel.MINUTE]} />
                </div>
            </div>
            <br></br>
            <h2>----------- Loading ----------- </h2>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12">
                    <Loading />

                    <Loading size={200} thickness="7px">
                        <p>Hello World!</p>
                    </Loading>

                    <Loading size={200} thickness="7px">
                        <Icon src={discord_logo} />
                    </Loading>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>----------- Progress ----------- </h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12 m-25">
                    <Progress percent={50} />
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div className="col-md-12 m-25">
                    <Progress label={label} percent={50} />
                </div>
            </div>

            <h2>----------- Input ----------- </h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row halign-center">
                <div className="col-md-12 m-25">
                    <Input
                        prefix={prefixLabel}
                        suffix={suffixLabel}
                        value={inputValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setInputValue(e.target.value);
                        }}
                    />
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
};

export default ExamplesSection;
