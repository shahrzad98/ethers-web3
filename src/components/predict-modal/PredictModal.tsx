import { FC, useState, useEffect } from "react";
import { Icon } from "components/icon";
import info_logo from "assets/icons/svgs/info.svg";
import plus_logo from "assets/icons/svgs/plus.svg";
import rocket_logo from "assets/icons/svgs/rocket.svg";
import alert_logo from "assets/icons/svgs/alert.svg";
import ido_logo from "assets/icons/svgs/spark.svg";
import Icon_Spark_loading from "assets/icons/svgs/Icon_Spark_loading.svg";
import {
    Button,
    ButtonWidth,
    Input,
    SliderRange,
    useSliderRange,
    Tooltip,
    RadioGroup,
    Radio,
    Modal,
    ConfirmModal,
    Currency,
    CurrencyUnit,
    TooltipPosition,
} from "@totemfi/ui-components";
import "./PredictModal.scss";
import { useIDOPredictionPool } from "services/useIDOPredictionPool";
import { PredictionPool } from "models";
import { parseValueToNumber, formatNumberWithCommas, isValidNumber } from "utils/number";
import { useSparksToken } from "services/useSparksToken";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";
import { useNotification } from "hooks";
import { useHistory } from "react-router";
import { TransactionAddress } from "components/transaction-address";
import { transactionEndpoint } from "utils/configs";
export interface PredictModalProps {
    data: PredictionPool;
    onClose: any;
}
const PredictModal: FC<PredictModalProps> = ({ data, onClose }: PredictModalProps) => {
    const { account } = useWebWallet();
    const notification = useNotification();
    const history = useHistory();
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const idoTokenBalance = Number(data?.idoPrice) === 0 || data?.idoPrice === "TBA" ? 1 : Number(data?.idoPrice);

    const [form, setForm] = useState<any>({
        amount: 0,
        prices: [idoTokenBalance],
    });

    const sparksToken = useSparksToken();

    const { data: sparksTokenBalance } = useQuery(
        ["sparks-token-balance", account],
        () => sparksToken.getBalance(account),
        {
            enabled: !!sparksToken.contract,
        },
    );

    useEffect(() => {
        !showModal && setShowModal(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const sparksTokenBalanceInput = sparksTokenBalance !== 0 ? sparksTokenBalance || 1000 : 1000;
    const sparksTokenBalanceInput = 100000;
    useEffect(() => {
        if (!form?.prices || !form?.amount) {
            if (sparksTokenBalanceInput > 2500) {
                setForm({ ...form, amount: 500, prices: [idoTokenBalance, idoTokenBalance] });
            } else {
                setForm({ ...form, amount: 500, prices: [idoTokenBalance] });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sparksTokenBalance, idoTokenBalance]);

    const idoPredictionPool = useIDOPredictionPool(data.id || "0x00");

    const handleChange = (event: any) => {
        const { name, value: _value } = event.target;
        const value = parseValueToNumber("" + _value);
        const isValid = isValidNumber("" + _value);

        if (isValid) {
            if (name === "amount" && Number(value) < 2500 && form?.prices?.length === 2) {
                setForm({ ...form, [name]: value, prices: [form?.prices[0]] });
                setRadioGroupValue(0);
            } else if (
                name === "amount" &&
                Number(value) > 2500 &&
                Number(value) < sparksTokenBalanceInput &&
                form?.prices?.length === 1
            ) {
                setForm({ ...form, [name]: value, prices: [form?.prices[0], idoTokenBalance] });
            } else if (name === "amount" && Number(value) > sparksTokenBalanceInput) {
                if (Number(value) > 2500 && Number(value) < sparksTokenBalanceInput && form?.prices?.length === 1) {
                    setForm({ ...form, [name]: sparksTokenBalanceInput, prices: [form?.prices[0], idoTokenBalance] });
                } else {
                    setForm({ ...form, [name]: sparksTokenBalanceInput });
                }
            } else {
                setForm({ ...form, [name]: value });
            }
        }
    };

    const mutationStake = useMutation((_form: any): any => {
        return idoPredictionPool?.stake({
            _amount: _form.amount,
            _pricePrediction1: _form.prices[0],
            _pricePrediction2: _form.amount > 2500 ? _form?.prices[1] || 0 : 0,
        });
    });

    const transactionData: any = mutationStake?.data;
    const transactionAddress: string = transactionData?.hash;

    const handleClose = () => {
        mutationStake.reset();
        setShowConfirmModal(false);
    };
    const handleStake = () => {
        mutationStake.reset();

        if (form.amount < 250) {
            notification.error("Minimum stake value is 250 SPRK");
            return;
        }
        if ((sparksTokenBalance || sparksTokenBalance === 0) && form.amount > sparksTokenBalance) {
            notification.error("You don't have sufficient amount of SPRK.");
            return;
        }

        setShowConfirmModal(true);
    };
    const handleConfirmStake = () => {
        if (!mutationStake?.isSuccess) {
            mutationStake.mutate(form, {
                onSuccess: () => {
                    queryClient.invalidateQueries(`prediction-details-${data?.id}`);
                    queryClient.invalidateQueries("sparks-token-balance");
                },
            });
        } else {
            onClose();
            setShowConfirmModal(false);
        }
    };

    const [radioGroupValue, setRadioGroupValue] = useState<number>(0);

    const prefixLabelStake = <span style={{ color: "#7d8598" }}>SPRK</span>;
    const prefixLabelPrice = <span style={{ color: "#7d8598" }}>USD</span>;
    const { calculatePercentFromValue } = useSliderRange(0, 100); //pass min and max

    const getTooltip = (amount: number) => {
        if (amount < 500) {
            return { range: 0, title: "Tier 0", description: `${500 - form.amount} to Tier 1` };
        } else if (amount >= 500 && amount < 2500) {
            return { range: 12.5, title: "Tier 1", description: `${2500 - form.amount} to Tier 2` };
        } else if (amount >= 2500 && amount < 10000) {
            return { range: 37.5, title: "Tier 2", description: `${10000 - form.amount} to Tier 3` };
        } else if (amount >= 10000 && amount < 40000) {
            return { range: 62.5, title: "Tier 3", description: `${40000 - form.amount} to Tier 4` };
        } else if (amount >= 40000 && amount < 50000) {
            return { range: 87.5, title: "Tier 4", description: "Tier 4" };
        } else if (amount >= 50000) {
            return { range: 100, title: "Tier 4", description: "Tier 4" };
        }
    };

    return (
        <>
            <Modal
                title="Your prediction"
                maxHeight="444px"
                open={showModal}
                onClose={() => {
                    setShowModal(false);
                    onClose();
                }}
            >
                <div className="predict-modal ">
                    <div className="predict-modal-stake">
                        <label className="predict-modal-stake-label">
                            Your stake
                            <Tooltip
                                position={TooltipPosition.DOWN}
                                description="So higher your stake, so higher the Tier you can reach. Higher Tiers enable you to add a second prediction and thereby increase your chances of winning. "
                            >
                                <Icon src={info_logo} />
                            </Tooltip>
                        </label>
                        <Input
                            className="predict-modal-stake-input"
                            prefix={prefixLabelStake}
                            value={formatNumberWithCommas(form.amount)}
                            name="amount"
                            onChange={handleChange}
                            autoComplete="off"
                            theme="purple"
                        />
                        {sparksTokenBalanceInput && (
                            <SliderRange
                                className="predict-modal-stake-slider"
                                initialValue={form.amount}
                                min={0}
                                max={sparksTokenBalanceInput}
                                onChange={(percent: number, value: number) => {
                                    handleChange({ target: { name: "amount", value } });
                                }}
                                labels={[
                                    { value: 0, present: "0%" },
                                    { value: sparksTokenBalanceInput / 4, present: "25%" }, // isPercent is the way that we request to treat value: 25 as a percent value not a value between min and max
                                    { value: sparksTokenBalanceInput / 2, present: "50%" },
                                    { value: (sparksTokenBalanceInput * 3) / 4, present: "75%" },
                                    { value: sparksTokenBalanceInput, present: "100%" },
                                ]}
                                labelBackground={true}
                                theme="purple"
                            />
                        )}

                        <div className="predict-modal-stake-slider-tier">
                            <Tooltip
                                pointTo={calculatePercentFromValue(Number(getTooltip(form?.amount)?.range || 0))}
                                title={getTooltip(form?.amount)?.title || ""}
                                description={getTooltip(form?.amount)?.description || ""}
                            >
                                <SliderRange
                                    min={0}
                                    max={100}
                                    initialValue={getTooltip(form?.amount)?.range || 0}
                                    readOnly
                                    labels={[
                                        { value: 12.5, present: "500" }, // isPercent is the way that we request to treat value: 25 as a percent value not a value between min and max
                                        { value: 37.5, present: "2.5k" },
                                        { value: 62.5, present: "10k" },
                                        { value: 87.5, present: "40k" },
                                    ]}
                                    theme="purple"
                                />
                            </Tooltip>
                        </div>
                    </div>
                    <div className="predict-modal-price">
                        <label className="predict-modal-price-label">Max price after 24h</label>

                        <RadioGroup
                            value={radioGroupValue}
                            onChange={(event: any) => {
                                setRadioGroupValue(event.target.value);
                            }}
                            className={
                                form.prices.length === 1
                                    ? "predict-modal-price-items  hide-input"
                                    : "predict-modal-price-items"
                            }
                        >
                            {form.prices?.map((price: any, index: any) => (
                                <Radio key={index} value={index} theme="purple">
                                    <Input
                                        className="predict-modal-price-items-input"
                                        prefix={prefixLabelPrice}
                                        value={formatNumberWithCommas(price)}
                                        autoComplete="off"
                                        onChange={(event: any) => {
                                            const _prices = [...form.prices];
                                            const value = parseValueToNumber("" + event.target.value);

                                            if (isValidNumber("" + event.target.value)) {
                                                if (Number(value) > idoTokenBalance * 100) {
                                                    _prices[index] = idoTokenBalance * 100;
                                                } else {
                                                    _prices[index] = value;
                                                }
                                                setForm({ ...form, prices: _prices });
                                            }
                                        }}
                                        onClick={() => {
                                            setRadioGroupValue(index);
                                        }}
                                        theme="purple"
                                    />
                                    {/* {index !== 0 && (
                                        <span
                                            className="predict-modal-price-items-minus"
                                            onClick={() => {
                                                setForm({
                                                    ...form,
                                                    prices: form.prices.filter(
                                                        (i: any, priceIndex: any) => priceIndex !== index,
                                                    ),
                                                });
                                                setRadioGroupValue(radioGroupValue - 1);
                                            }}
                                        >
                                            <Tooltip description={`remove ${index + 1}nd Prediction`}>
                                                <Icon src={minus_logo} style={{ width: 22 }} />
                                            </Tooltip>
                                        </span>
                                    )} */}
                                </Radio>
                            ))}
                        </RadioGroup>
                        {!!idoTokenBalance && form?.prices?.length > 0 && (
                            <SliderRange
                                className="predict-modal-price-slider"
                                initialValue={form.prices[radioGroupValue]}
                                min={0}
                                max={idoTokenBalance * 100}
                                onChange={(percent: number, value: number) => {
                                    const _prices = [...form.prices];
                                    _prices[radioGroupValue] = value;
                                    setForm({ ...form, prices: _prices });
                                }}
                                labels={[
                                    { value: idoTokenBalance, present: "1x" },
                                    // { value: idoTokenBalance * 2, present: "2x" },
                                    // { value: idoTokenBalance * 5, present: "5x" },
                                    // { value: idoTokenBalance * 10, present: "10x" },
                                    { value: idoTokenBalance * 25, present: "25x" }, // isPercent is the way that we request to treat value: 25 as a percent value not a value between min and max
                                    { value: idoTokenBalance * 50, present: "50x" },
                                    { value: idoTokenBalance * 75, present: "75x" },
                                    { value: idoTokenBalance * 100, present: "100x" },
                                ]}
                                labelBackground={true}
                                theme="purple"
                            />
                        )}

                        <span
                            style={{ visibility: form.prices.length < 2 && form.amount > 2500 ? "unset" : "hidden" }}
                            className="predict-modal-price-plus"
                            onClick={() => {
                                setForm({ ...form, prices: [...form.prices, idoTokenBalance] });
                                setRadioGroupValue(form.prices.length);
                            }}
                        >
                            <Icon src={plus_logo} style={{ marginTop: "-5px" }} />
                            Add {form.prices.length + 1}nd Prediction
                            <Tooltip
                                description="Depending on your Tier, you can add a second prediction and increase your chances of winning.
The second prediction does not define a range and is independent of the first one. 
"
                            >
                                <Icon src={info_logo} />
                            </Tooltip>
                        </span>
                    </div>

                    <div className="col-md-12">
                        <Button width={ButtonWidth.FIT_PARENT} onClick={handleStake} theme="purple">
                            Predict Now
                        </Button>
                    </div>
                </div>
            </Modal>

            <ConfirmModal
                description={
                    mutationStake?.isError
                        ? "We weren't able to submit prediction please try again"
                        : mutationStake?.isSuccess
                        ? "Predictions confirmed"
                        : "Please confirm your prediction for"
                }
                iconComponent={
                    mutationStake?.isError ? (
                        <Icon src={alert_logo} style={{ width: 96 }} />
                    ) : mutationStake?.isSuccess ? (
                        <Icon src={rocket_logo} style={{ width: 81 }} />
                    ) : (
                        <></>
                    )
                }
                open={showConfirmModal}
                onClose={handleClose}
                confirmTitle={mutationStake?.isError ? "Try again" : mutationStake?.isSuccess ? "Close" : "Confirm"}
                cancelTitle={mutationStake?.isError ? "Edit" : mutationStake?.isSuccess ? "My Account" : "Edit"}
                onConfirm={handleConfirmStake}
                onCancel={() => {
                    mutationStake?.isError
                        ? setShowConfirmModal(false)
                        : mutationStake?.isSuccess
                        ? history.push("/account-management")
                        : setShowConfirmModal(false);
                }}
                width="25"
                isLoading={mutationStake?.isLoading}
                iconLoadingComponent={
                    <>
                        <Icon src={Icon_Spark_loading} style={{ width: 115 }} className="loader" />
                    </>
                }
                title={mutationStake?.isLoading ? "Waiting for confirmation" : undefined}
                theme="purple"
            >
                {mutationStake.isError && <></>}

                {!mutationStake?.isLoading && !mutationStake.isError && (
                    <div className="confirm-modal">
                        <span className="confirm-modal-logo">
                            <Icon src={data?.logoUrl || ido_logo} style={{ width: "40px", borderRadius: "50%" }} />{" "}
                            {data?.title}
                        </span>

                        <div className="confirm-modal-details">
                            <div className="confirm-modal-details-item">
                                <div className="confirm-modal-details-item-label">
                                    Your Prediction {form?.prices[1] ? "(1)" : ""}
                                </div>
                                <div className="confirm-modal-details-item-value">
                                    <Currency value={form?.prices[0]} unit={CurrencyUnit.USDC} color="#811FCC" />
                                </div>
                            </div>
                            {form?.prices[1] ? (
                                <div className="confirm-modal-details-item">
                                    <div className="confirm-modal-details-item-label">Your Prediction (2)</div>
                                    <div className="confirm-modal-details-item-value">
                                        <Currency value={form?.prices[1]} unit={CurrencyUnit.USDC} color="#811FCC" />
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="confirm-modal-details-item">
                                <div className="confirm-modal-details-item-label">Your Stake</div>
                                <div className="confirm-modal-details-item-value">
                                    <Currency value={form?.amount} unit={CurrencyUnit.SPRK} color="#811FCC" />
                                </div>
                            </div>

                            {mutationStake?.isSuccess && (
                                <span className="confirm-modal-details-txid">
                                    <TransactionAddress
                                        transactionEndpoint={transactionEndpoint}
                                        address={transactionAddress || "0"}
                                    />
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </ConfirmModal>
        </>
    );
};
PredictModal.defaultProps = {};
export default PredictModal;
