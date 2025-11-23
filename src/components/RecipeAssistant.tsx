import React, { useState } from 'react';
import { runWorkflow } from '../utils/Agent';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface RecipeAssistantProps {
  className?: string;
}

/**
 * RecipeAssistant Component
 *
 * This component integrates the OpenAI Agent workflow to help users find recipes
 * based on their existing ingredients and cooking intentions.
 */
export const RecipeAssistant: React.FC<RecipeAssistantProps> = ({ className }) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * Handles the recipe search workflow
   * Calls the runWorkflow function with user input
   */
  const handleFindRecipes = async () => {
    if (!userInput.trim()) {
      setError('Please enter your ingredients or cooking intention');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult('');

    try {
      // Call the Agent workflow with user input
      const workflowResult = await runWorkflow({
        input_as_text: userInput
      });

      // The workflow returns a trace object
      // Extract the conversation history or results from it
      setResult(JSON.stringify(workflowResult, null, 2));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Workflow error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>AI Recipe Assistant</CardTitle>
        <CardDescription>
          Tell me what ingredients you have or what you want to cook!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="user-input" className="text-sm font-medium">
            Your Request
          </label>
          <Textarea
            id="user-input"
            placeholder="Example: I have chicken, tomatoes, and garlic. I want to make something quick for dinner."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <Button
          onClick={handleFindRecipes}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Finding Recipes...' : 'Find Recipes'}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Result:</h3>
            <pre className="p-4 bg-gray-50 border border-gray-200 rounded-md text-xs overflow-auto max-h-96">
              {result}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
