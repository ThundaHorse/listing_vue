import { shallowMount } from "@vue/test-utils";
import Postings from "../../src/views/postings/Postings.vue";

describe("Postings.vue", () => {
  it("has a MessageBox component", () => {
    const wrapper = shallowMount(Postings);
    console.log(wrapper);
  });
});
