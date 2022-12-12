import { openmatchMatchProfile } from "@node-open-match/api";
import { modes } from "./modes";

export function generateProfiles(): openmatchMatchProfile[] {
  const profiles: openmatchMatchProfile[] = [];

  for (const mode of modes) {
    profiles.push({
      name: `mode_based_profile${mode}`,
      pools: [
        {
          name: `pool_mode_${mode}`,
          tag_present_filters: [
            {
              tag: mode,
            },
          ],
        },
      ],
    });
  }

  return profiles;
}
