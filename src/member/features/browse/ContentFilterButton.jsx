import { PrimaryButton, SecondaryButton } from "../../components/Button";

export default function ContentFilterButton() {
    return (
        <div>
            <PrimaryButton type='submit' addClassName="w-28 mr-4">Apply</PrimaryButton>
            <SecondaryButton type='button' onClick={handleResetBtn} addClassName="w-28 mr-4">Reset</SecondaryButton>
        </div>
    )
}