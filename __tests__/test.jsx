import React from 'react';
import { mount } from 'enzyme';
import App from '../src/App';

const selectors = {
  tabsBox: '[data-test="tabs-box"]',
  addTabBtn: '[data-test="tab-add-btn"]',
  removeTabBtn: '[data-test="tab-remove-btn"]',
  tabItem: 'li[data-test="tab-item"]',
};

const getPage = wrapper => ({
  getTabsBox: () => wrapper.find(selectors.tabsBox),
  getAddTabBtn: () => wrapper.find(selectors.addTabBtn),
  getRemoveTabBtn: position => wrapper.find(selectors.removeTabBtn).at(position - 1),
  getTab: position => wrapper.find(selectors.tabItem).at(position - 1),
});

describe('default actions with tabs', () => {
  test('add', () => {
    const wrapper = mount(<App />);
    const page = getPage(wrapper);
    const addTabBtn = page.getAddTabBtn();

    addTabBtn.simulate('click');
    const tabs = page.getTabsBox();
    expect(tabs).toContainMatchingElements(3, selectors.tabItem);
  });

  test('remove', () => {
    const wrapper = mount(<App />);
    const page = getPage(wrapper);
    const removeTabBtn = page.getRemoveTabBtn(1);

    removeTabBtn.simulate('click');

    const tabs = page.getTabsBox();
    expect(tabs).toContainMatchingElements(1, selectors.tabItem);
  });

  test('toggle', () => {
    const wrapper = mount(<App />);
    const page = getPage(wrapper);
    const addTabBtn = page.getAddTabBtn();

    addTabBtn.simulate('click');

    const firstTab = page.getTab(1);
    expect(firstTab).toHaveProp('aria-selected');
    const secondTab = page.getTab(2);
    secondTab.simulate('click');
    const activeTab = page.getTab(2);
    const nonActiveTab = page.getTab(1);
    expect(nonActiveTab).toHaveProp('aria-selected', 'false');
    expect(activeTab).toHaveProp('aria-selected', 'true');
  });
});

describe('should save last opened tab', () => {
  const getStorage = () => {
    const storage = {};
    return {
      get: key => storage[key],
      set: (key, value) => { storage[key] = value; },
    };
  };

  test('coockies', () => {
    const storage = getStorage();
    const wrapper = mount(<App storage={storage} />);
    const page = getPage(wrapper);
    const addTabBtn = page.getAddTabBtn();

    addTabBtn.simulate('click');
    const secondTab = page.getTab(2);
    secondTab.simulate('click');

    console.log(storage.get());
    const secondWrapper = mount(<App storage={storage} />);
    const secondPage = getPage(secondWrapper);
    const activeTab = secondPage.getTab(2);
    expect(activeTab).toHaveProp('aria-selected', 'true');
  });
});
