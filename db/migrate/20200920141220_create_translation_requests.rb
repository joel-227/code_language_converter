class CreateTranslationRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :translation_requests do |t|
      t.string :original_language
      t.string :converted_language
      t.text :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
