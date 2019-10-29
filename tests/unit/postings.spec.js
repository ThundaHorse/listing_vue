import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Postings from "../../src/views/postings/Postings.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
jest.mock("axios");

describe("Postings.vue", () => {
  beforeEach(() => {
    window.alert = jest.fn();
    Postings.mounted = jest.fn();
    Postings.created = jest.fn();
  });

  it("properly displays a listing", () => {
    const wrapper = shallowMount(Postings, { localVue, router });
    wrapper.setData({
      listings: [{ id: 1, user_id: 1, title: "Test" }],
      items: [
        { description: "Test", name: "Test", price: 99.99, listing_id: 1 }
      ]
    });

    let link = wrapper.find("a");
    expect(link.text()).toBe("Test");
  });

  it("displays a message when no listings are available", () => {
    const wrapper = shallowMount(Postings, { localVue });
    let link = wrapper.find("h1");
    expect(link.text()).toBe("You have no listings!");
  });

  it("triggers the show action when clicking a listing", () => {
    const wrapper = shallowMount(Postings, { localVue, router });
    const spy = jest.fn();
    wrapper.setData({
      listings: [{ id: 1, user_id: 1, title: "Test" }],
      items: [
        { description: "Test", name: "Test", price: 99.99, listing_id: 1 }
      ]
    });
    wrapper.setMethods({ postPage: spy });
    let link = wrapper.find("a.posting");
    link.trigger("click");
    expect(spy).toHaveBeenCalled();
  });
});
