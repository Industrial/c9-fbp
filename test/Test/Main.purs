module Test.Main where

import Prelude

import Effect (Effect)
import Effect.Aff (launchAff_)
import Test.Spec (describe, it)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (runSpec)

main :: Effect Unit
main = launchAff_ $ runSpec [ consoleReporter ] do
  describe "Test.Main" do
    it "should pass" do
      1 `shouldEqual` 1

    it "should fail" do
      1 `shouldEqual` 2

    it "should be pending" $ pure unit
    it "should be skipped" $ pure unit
