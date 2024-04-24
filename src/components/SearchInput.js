import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Description, Field, Label } from "@/components/common/fieldset";
import { Input } from "@/components/common/input";

function SearchInput({ onSelect }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    // requestOptions: { componentRestrictions: { country: "us" } },
    debounce: 300,
    cache: 86400,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        console.log("Geocode", results);
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
        onSelect({ description, lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 cursor-pointer"
          onClick={handleSelect(suggestion)}
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <div className="text-sm font-semibold leading-6 text-gray-900">
                <p>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {main_text}
                </p>
              </div>
              <div className="mt-1 flex text-xs leading-5 text-gray-500">
                <p className="relative truncate">{secondary_text}</p>
              </div>
            </div>
          </div>
        </li>
      );
    });

  return (
    <div>
      <Field ref={ref} className="w-full">
        <Label>Destino</Label>
        <Description>¿A dónde quieres ir?</Description>
        <Input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where are you going?"
        />
        {/* <ErrorMessage>Required</ErrorMessage> */}
      </Field>
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul
          role="list"
          className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-2"
        >
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
