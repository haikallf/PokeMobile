import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { globalStyles } from "../styles/globalStyles";

export const AbilityCard = ({ abilities }) => {
  const [abilityDetails, setAbilityDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbilities = async () => {
      setLoading(true);
      try {
        if (abilities && Array.isArray(abilities)) {
          const responses = await Promise.all(
            abilities.map((ability) =>
              ability.ability?.url
                ? axios.get(ability.ability.url)
                : Promise.resolve(null)
            )
          );

          const fetchedAbilities = responses.map((response) => {
            if (response && response.data) {
              const effectEntry = response.data?.effect_entries?.find(
                (entry) => entry.language?.name === "en"
              );
              return {
                ...response.data,
                effect: effectEntry
                  ? effectEntry.effect
                  : "No effect description available.",
                shortEffect: effectEntry
                  ? effectEntry.short_effect
                  : "No short effect description available.",
              };
            }

            return {
              effect: "Effect data is not available.",
              shortEffect: "Short effect data is not available.",
            };
          });

          setAbilityDetails(fetchedAbilities);
        }
      } catch (error) {
        console.error("Failed to fetch abilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbilities();
  }, [abilities]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {abilityDetails.map((detail, index) => (
        <React.Fragment key={index}>
          <Text style={{ ...globalStyles.title3, ...styles.abilityTitle }}>
            {index + 1}. {detail.name}
          </Text>
          <View>
            <Text style={styles.effectText}>Effect: {detail.effect}</Text>
            <Text style={styles.shortEffectText}>
              Short Effect: {detail.shortEffect}
            </Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  abilityTitle: {
    marginTop: 8,
  },
  abilityContainer: {
    marginBottom: 10, // Adds space between each ability
  },
  effectContainer: {
    marginTop: 5, // Adds space between the ability name and its effects
  },
  effectText: {
    marginBottom: 8, // Adds space between "Effect" and "Short Effect"
  },
  shortEffectText: {},
});
