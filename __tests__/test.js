import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

import {spy} from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

require('jsdom-global')()

import Main from '../client/components';
import Settings from '../client/components/settings';

describe(' ▒▒▒ React Tests ▒▒▒ ', () => {

  describe('Main Component\'s Default State', () => {
    let mainWrapper;
    beforeEach('Create <Main /> Component', () => {
      mainWrapper = shallow(<Main />);
    })
    it('should have openNow default to false', () => {
      expect(mainWrapper.state().openNow).to.equal(false);
    });

    it('should have latitude default to Zenefit\'s HQ, 37.7852332', () => {
      expect(mainWrapper.state().lat).to.equal(37.7852332);
    });

    it('should have longitude default to Zenefit\'s HQ, -122.3978821', () => {
      expect(mainWrapper.state().lng).to.equal(-122.3978821);
    });

    it('should have places set to an empty array', () => {
      expect(mainWrapper.state().places).to.deep.equal([]);
    });

    it('should have radius set to 1609 (meters)', () => {
      expect(mainWrapper.state().radius).to.equal(1609);
    });

    it('should have textInput be an empty string', () => {
      expect(mainWrapper.state().textInput).to.equal('');
    })
  });

  describe('Settings Component', () => {
    let settingsWrapper;

    describe('Visual Content', () => {
      beforeEach('Create <Settings /> Component', () => {
        const testRadiusHandler = function(){return 1};
        const testOpenNowHandler = function(){return 2};
        const testOpen = true;
        const testRadius = 3219;
        settingsWrapper = shallow(<Settings
          handleRadiusChange={testRadiusHandler}
          handleOpenNowChange={testOpenNowHandler}
          radius={testRadius}
          openNow={testOpen} />
        );
      });

      it('should have two setting inputs', () => {
        expect(settingsWrapper.find('select')).to.have.length(2);
      });
      it('should have a label for each setting', () => {
        expect(settingsWrapper.find('label')).to.have.length(2);
      });
      it('should have `radius: ` as the first label', () => {
        expect(settingsWrapper.find('label').at(0)).to.have.html('<label for="sel1">Radius:</label>');
      });
      it('should have `Availability: ` as the second label', () => {
        expect(settingsWrapper.find('label').at(1)).to.have.html('<label for="sel1">Availability:</label>');
      });
      it('should have 6 options in total', () => {
        expect(settingsWrapper.find('option')).to.have.length(6);;
      });
    });

    describe('Props', () => {
      beforeEach('Create <Settings /> Component', () => {
        const testRadiusHandler = function(){return 1};
        const testOpenNowHandler = function(){return 2};
        const testOpen = true;
        const testRadius = 3219;
        settingsWrapper = shallow(<Settings
          handleRadiusChange={testRadiusHandler}
          handleOpenNowChange={testOpenNowHandler}
          radius={testRadius}
          openNow={testOpen} />
        );
      });

      it('defaults to radius passed in', () => {
        expect(settingsWrapper.find('select').at(0).props().value).to.equal(3219);
      });
      it('defaults to openNow passed in', () => {
        expect(settingsWrapper.find('select').at(1).props().value).to.equal(true);
      });
    });

    describe('Handlers', () => {
      let testRadiusSpy, testOpenNowSpy;
      beforeEach('Create <Settings /> Component', () => {
        testRadiusSpy = spy();
        testOpenNowSpy = spy();
        const testOpen = true;
        const testRadius = 3219;
        settingsWrapper = mount(<Settings
          handleRadiusChange={testRadiusSpy}
          handleOpenNowChange={testOpenNowSpy}
          radius={testRadius}
          openNow={testOpen} />
        );
      });

      it('should not call upon the radius spy instantly', () => {
        expect(testRadiusSpy).not.to.have.been.called;
        expect(testOpenNowSpy).not.to.have.been.called;
      });
      it('should call on the radius spy after changing radius', () => {
        settingsWrapper.find('select').at(0).simulate('change', {target: {value: 402}});
        expect(testRadiusSpy).to.have.been.called;
      });
      it('should call on the openNow spy after changing openNow', () => {
        settingsWrapper.find('select').at(1).simulate('change', {target: {value: false}});
        expect(testOpenNowSpy).to.have.been.called;
      });
    });
  });
});
