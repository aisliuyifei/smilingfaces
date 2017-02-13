class CreateFaces < ActiveRecord::Migration
  def change
    create_table :faces do |t|
      t.string :token
      t.integer :u_id

      t.timestamps null: false
    end
  end
end
