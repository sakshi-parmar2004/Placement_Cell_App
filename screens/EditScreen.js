import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  TextInput,
  Button,
  Text,
  Divider,
  Title,
  Subheading,
} from "react-native-paper";
import { getOneNotice, updateNotice } from "../lib/api";

const EditJobScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { post } = route.params;

  const [title, setTitle] = useState(post.title || "");
  const [company, setCompany] = useState(post.company || "");
  const [jobPackage, setPackage] = useState(post.package || "");
  const [location, setLocation] = useState(post.location || "");
  const [lastDateToApply, setLastDateToApply] = useState(
    post.last_date_to_apply || ""
  );
  const [applyLink, setApplyLink] = useState(post.apply_link || "");
  const [description, setDescription] = useState(post.description || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        (async () => {
            const notice = await getOneNotice(post._id);
            setTitle(notice.title);
            setCompany(notice.company)
            setPackage(notice.package)
            setLocation(notice.location)
            setLastDateToApply(notice.last_date_to_apply)
            setApplyLink(notice.apply_link)
            setDescription(notice.description)
        })()
    }, [])

  const handleUpdate = async () => {
    if (!title) {
      Alert.alert("Validation Error", "Title is required.");
      return;
    }

    setIsSubmitting(true);
    try {
        const updatedFields = {};
        updatedFields.noticeId = post._id;
        updatedFields.userId = post.user_id;
      if (title !== undefined) updatedFields.title = title;
      if (company !== undefined) updatedFields.company = company;
      if (jobPackage !== undefined) updatedFields.package = jobPackage;
      if (location !== undefined) updatedFields.location = location;
      if (lastDateToApply !== undefined)
        updatedFields.last_date_to_apply = lastDateToApply;
      if (applyLink !== undefined) updatedFields.apply_link = applyLink;
      if (description !== undefined) updatedFields.description = description;

        const response = await updateNotice(updatedFields)
        if (response == "success") {
            Alert.alert("Success", "Job post updated.");
            navigation.navigate("coordinator_profile");
        } else {
            Alert.alert("Error", "Could not update job post.");
        }
    } catch (error) {
      console.error("Error updating document:", error);
      Alert.alert("Error", "Could not update job post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.pageTitle}>Edit Job Post</Title>

      {/* Job Info Section */}
      <SectionHeader title="Job Info" />
      <TextInput
        label="Job Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Job Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        mode="outlined"
        style={styles.input}
      />

      {/* Company Info Section */}
      <SectionHeader title="Company Info" />
      <TextInput
        label="Company Name"
        value={company}
        onChangeText={setCompany}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Package"
        value={jobPackage}
        onChangeText={setPackage}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        style={styles.input}
      />

      {/* Application Info Section */}
      <SectionHeader title="Application Info" />
      <TextInput
        label="Last Date to Apply"
        value={lastDateToApply}
        onChangeText={setLastDateToApply}
        mode="outlined"
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />
      <TextInput
        label="Application Link"
        value={applyLink}
        onChangeText={setApplyLink}
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleUpdate}
        loading={isSubmitting}
        disabled={isSubmitting}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
      >
        {isSubmitting ? "Updating..." : "Update Job"}
      </Button>
    </ScrollView>
  );
};

// Component for reusable section headers
const SectionHeader = ({ title }) => (
  <View style={{ marginTop: 30, marginBottom: 10 }}>
    <Subheading style={styles.sectionTitle}>{title}</Subheading>
    <Divider />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "bold",
      color: "#2c3e50",
    marginTop: 15
  },
  sectionTitle: {
    fontSize: 16,
    color: "#444",
    fontWeight: "600",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 30,
    borderRadius: 6,
  },
});

export default EditJobScreen;
