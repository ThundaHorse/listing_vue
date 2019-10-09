import { shallowMount } from "@vue/test-utils";
import Postings from "@/views/Postings.vue";

describe("Postings.vue", () => {
  it("has a MessageBox component", () => {
    const wrapper = shallowMount(Postings);
    // expect(wrapper.components).toEq("MessageBox");
    console.log(wrapper);
  });
});
