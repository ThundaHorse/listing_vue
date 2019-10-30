import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Router from "../../src/router";
import Postings from "../../src/views/postings/Postings.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
const paths = Router.options.routes;
const router = new VueRouter(paths);

describe("Postings.vue", () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  it("routes to correct listing when clicked", () => {
    const wrapper = shallowMount(Postings, {
      localVue,
      router
    });
    wrapper.setData({
      listings: [{ id: 1, user_id: 1, title: "Test" }],
      items: [
        { description: "Test", name: "Test", price: 99.99, listing_id: 1 }
      ]
    });

    let link = wrapper.find("a");
    link.trigger("click");
    expect(wrapper.vm.$route.path).toBe("/postings/1");
  });

  it("loads all listings on load", () => {
    const wrapper = shallowMount(Postings, { localVue, router });
    wrapper.setData({
      listings: [
        { id: 1, user_id: 1, title: "Test" },
        { id: 2, user_id: 1, title: "Test 2" }
      ],
      items: [
        { description: "Test", name: "Test", price: 99.99, listing_id: 1 },
        { description: "Test 2", name: "Test 2", price: 99.99, listing_id: 2 }
      ]
    });

    console.log(wrapper.find("a").text());
  });
});

// describe("Postings.vue", () => {
//   beforeEach(() => {
//     window.alert = jest.fn();
//     Postings.mounted = jest.fn();
//     Postings.created = jest.fn();
//   });

//   it("properly displays a listing", () => {
//     const wrapper = shallowMount(Postings, { localVue, router });
//     wrapper.setData({
//   listings: [{ id: 1, user_id: 1, title: "Test" }],
//   items: [
//     { description: "Test", name: "Test", price: 99.99, listing_id: 1 }
//   ]
// });

//     let link = wrapper.find("a");
//     expect(link.text()).toBe("Test");
//   });

//   it("displays a message when no listings are available", () => {
//     const wrapper = shallowMount(Postings, { localVue });
//     let link = wrapper.find("h1");
//     expect(link.text()).toBe("You have no listings!");
//   });

//   it("triggers the show action when clicking a listing", () => {
//     const wrapper = shallowMount(Postings, { localVue, router });
//     const spy = jest.fn();
//     wrapper.setData({
//       listings: [{ id: 1, user_id: 1, title: "Test" }],
//       items: [
//         { description: "Test", name: "Test", price: 99.99, listing_id: 1 }
//       ]
//     });
//     wrapper.setMethods({ postPage: spy });
//     let link = wrapper.find("a.posting");
//     link.trigger("click");
//     expect(spy).toHaveBeenCalled();
//   });
// });
