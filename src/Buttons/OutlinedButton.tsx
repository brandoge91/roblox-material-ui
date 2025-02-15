import { Linear, SingleMotor } from '@rbxts/flipper';
import Roact from '@rbxts/roact';
import { ColorScheme, LowerCaseColorScheme } from '../Constants';
import { Icons } from '../Icons';
import ThemeContext from '../Theme/ThemeContext';

interface OutlinedButtonProps {
	AnchorPoint?: Vector2;
	Position?: UDim2;
	Size?: UDim2;
	AutomaticSize?: boolean;
	Text: string;
	Icon?: Icons;
	Disabled?: boolean;
	ColorScheme?: ColorScheme;
	Pressed: () => void;
}

interface OutlinedButtonState {
	Debounce: boolean;
	Disabled: boolean;
	SizeX: UDim;
}

// @TODO: add icons and seperate state layer
export class OutlinedButton extends Roact.Component<OutlinedButtonProps, OutlinedButtonState> {
	stateMotor: SingleMotor;
	stateBinding: Roact.Binding<number>;
	buttonRef: Roact.Ref<TextButton>;

	state = {
		Debounce: false,
		Disabled: this.props.Disabled || false,
		SizeX: new UDim(1, 0),
	};

	constructor(props: OutlinedButtonProps) {
		super(props);

		this.buttonRef = Roact.createRef<TextButton>();

		this.stateMotor = new SingleMotor(0);

		const [stateBinding, setStateBinding] = Roact.createBinding(this.stateMotor.getValue());

		this.stateBinding = stateBinding;

		this.stateMotor.onStep(setStateBinding);
	}

	render() {
		return (
			<ThemeContext.Consumer
				render={(theme) => {
					const colorScheme = this.props.ColorScheme || ColorScheme.Primary;
					const lowerCaseColorScheme = colorScheme.lower() as LowerCaseColorScheme;

					return (
						<textbutton
							AutoButtonColor={false}
							// this works fine for outlined and text buttons but wont work on filled buttons
							BackgroundTransparency={this.stateBinding.map((opacity) => {
								return 1 - opacity;
							})}
							BackgroundColor3={theme.Colors[lowerCaseColorScheme]}
							AnchorPoint={this.props.AnchorPoint}
							Position={this.props.Position}
							Size={
								this.props.AutomaticSize
									? new UDim2(this.state.SizeX, this.props.Size ? this.props.Size.Y : new UDim(0, 35))
									: this.props.Size
							}
							// Size={this.props.Size || new UDim2(this.state.SizeX, new UDim(0, 35))}
							Text={''}
							Ref={this.buttonRef}
							Event={{
								MouseButton1Click: async () => {
									if (this.state.Disabled) return;
									if (this.state.Debounce === false) {
										this.setState({
											Debounce: true,
										});

										task.spawn(this.props.Pressed);

										await Promise.delay(0.25);
										this.setState({
											Debounce: false,
										});
									}
								},
								MouseButton1Up: async () => {
									// Why cant you just disable input on buttons 😭
									if (this.state.Disabled) return;
									this.stateMotor.setGoal(new Linear(0.08, { velocity: 0.5 }));
								},
								MouseEnter: () => {
									if (this.state.Disabled) return;
									this.stateMotor.setGoal(new Linear(0.08, { velocity: 0.5 }));
								},
								MouseButton1Down: () => {
									if (this.state.Disabled) return;
									this.stateMotor.setGoal(new Linear(0.12, { velocity: 0.5 }));
								},
								MouseLeave: () => {
									if (this.state.Disabled) return;
									this.stateMotor.setGoal(new Linear(0, { velocity: 0.5 }));
								},
							}}
						>
							<textlabel
								AnchorPoint={new Vector2(0.5, 0.5)}
								Position={UDim2.fromScale(0.5, 0.5)}
								Size={UDim2.fromScale(1, 1)}
								BackgroundTransparency={1}
								Font={'GothamMedium'}
								Text={this.props.Text}
								TextColor3={
									this.state.Disabled ? theme.Colors.onBackground : theme.Colors[lowerCaseColorScheme]
								}
								TextTransparency={this.state.Disabled ? 1 - 0.38 : 0}
								TextXAlignment={'Center'}
								TextYAlignment={'Center'}
								TextScaled
							>
								<uitextsizeconstraint MaxTextSize={20} MinTextSize={1} />
							</textlabel>
							<uicorner CornerRadius={new UDim(1, 0)} />
							<uistroke
								ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
								Color={theme.Colors.outline}
								Transparency={this.state.Disabled ? 1 - 0.12 : 0}
							/>
							<uipadding
								PaddingLeft={new UDim(0, 24)}
								PaddingRight={new UDim(0, 24)}
								PaddingBottom={new UDim(0, 6)}
								PaddingTop={new UDim(0, 6)}
							/>
						</textbutton>
					);
				}}
			/>
		);
	}

	calculateSize(button: TextButton) {
		print(button.AbsoluteSize);
		// doesnt account for icons yet
		const textLabel = button.FindFirstChildOfClass('TextLabel');

		if (textLabel) {
			let textBounds = textLabel.TextBounds.X;
			print(textBounds);
			textBounds += 48; // padding

			this.setState({
				SizeX: new UDim(0, textBounds),
			});
		}
	}

	protected didUpdate(previousProps: OutlinedButtonProps, previousState: OutlinedButtonState): void {
		if (this.props.Disabled !== previousProps.Disabled) {
			this.setState({
				Disabled: this.props.Disabled || false,
			});
		}

		// if (this.props.AutomaticSize && previousState.SizeX === this.state.SizeX) {
		// 	const button = this.buttonRef.getValue();

		// 	if (button) {
		// 		this.calculateSize(button);
		// 	}
		// }
	}

	protected didMount(): void {
		if (this.props.AutomaticSize && this.state.SizeX.Offset === 0) {
			const button = this.buttonRef.getValue();

			if (button) {
				this.calculateSize(button);
			}
		}
	}
}
