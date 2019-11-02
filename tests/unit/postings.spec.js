import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Router from "../../src/router";
import axios from "axios";

import Postings from "../../src/views/postings/Postings.vue";
import Login from "../../src/views/Login.vue";

jest.mock("axios");

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
    expect(wrapper.vm.$data.items.length).toBe(2);
  });
});

describe("Login.vue", () => {
  const mockAxios = {
    get: jest.fn().mockImplementation(() => {
      return new Promise((res, rej) => {
        mockAxios._resolve = res;
        mockAxios._reject = rej;
      });
    }),
    post: jest.fn().mockImplementation(() => {
      return new Promise((res, rej) => {
        mockAxios._resolve = res;
        mockAxios._reject = rej;
      });
    }),
    mockSuccess(resp) {
      this._resolve(resp);
    },
    mockError(resp) {
      this._reject(resp);
    },
    _resolve: null,
    _reject: null
  };

  it("logs a user in", () => {
    const wrapper = shallowMount(Login, {
      localVue,
      router
    });
    const response = { data: true };
    axios.post.mockResolvedValue(response);

    wrapper.setData({ email: "test@test.com", password: "p" });
    let loginForm = wrapper.find("form");
    loginForm.trigger("submit");

    const mockSubmitFunction = jest.fn();
    const formSubmit = wrapper.vm.submit;
    const bound = mockSubmitFunction.mockImplementation(formSubmit);

    expect(wrapper.vm.email).toBe("test@test.com");
    expect(wrapper.vm.password).toBe("p");
    expect(bound).toHaveBeenCalled();
  });
});
